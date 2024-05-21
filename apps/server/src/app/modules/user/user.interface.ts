import { Document } from "mongoose";
import { Model } from "mongoose";

interface PasswordHistory {
    password: string;
    updatedAt: Date;
}

export interface TUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    passwordHistory?: PasswordHistory[];
    passwordChangedAt: Date;
}

export const USER_ROLE = {
    user: 'user',
    admin: 'admin',
} as const;

export interface UserModel extends Model<TUser> {
    //instance methods - does user exists by username
    isUserExistsByUsername(username: string): Promise<TUser>;

    //instance methods - user existed by id
    isUserExists(_id: string): Promise<TUser>;

    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;

    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
    ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;