import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from './../../config';
import { TUser, UserModel } from './user.interface';

// user schema
const userSchema = new Schema<TUser>(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'username is required']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'email is required']
        },
        password: {
            type: String,
            required: true,
            select: 0,
            validate: {
                validator: (value: string) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(
                        value
                    ),
                message:
                    'Password must be between 8 and 20 characters, and contain at least one uppercase letter, one lowercase letter, and one number.'
            }
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        passwordHistory: [
            {
                password: String,
                updatedAt: Date
            }
        ],
        passwordChangedAt: Date
    },
    { versionKey: false, timestamps: true }
);

// hashed password
userSchema.pre('save', async function (next) {
    const user = this; // doc

    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );

    user.passwordChangedAt = new Date();

    // next();
});

// hide password, password history, change password date before sending response
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.passwordHistory;
    delete userObject.passwordChangedAt;
    return userObject;
};

// isUser exist statics by username
userSchema.statics.isUserExistsByUsername = async function (username: string) {
    return await User.findOne({ username }).select('+password');
};

// isUser exist statics by username
userSchema.statics.isUserExists = async function (id: string) {
    return await User.findById(id).select('+password');
};

// password match statics
userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// check if password is issued before password is changed
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
) {
    const passwordChangedTime =
        new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
