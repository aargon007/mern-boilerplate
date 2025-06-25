import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TLoginUser } from './auth.interface';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import config from '../../../config';
import { createToken } from './auth.utils';

// login user
const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist
    const user = await User.isUserExistsByUsername(payload.username);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    //checking if the password is correct
    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    //create token and sent to the  client

    // jwt payload
    const jwtPayload = {
        _id: user._id as string,
        email: user.email,
        role: user.role
    };
    // generate access token
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    );
    // generate refresh token
    // const refreshToken = createToken(
    //     jwtPayload,
    //     config.jwt_refresh_secret as string,
    //     config.jwt_refresh_expires_in as string,
    // );

    return {
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        token: accessToken
    };
};

// change password
const changePassword = async (
    userData: JwtPayload,
    payload: { currentPassword: string; newPassword: string }
) => {
    // check if the user is exist
    const user = await User.isUserExists(userData?._id);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is not found !');
    }

    // check if the password is correct
    if (
        !(await User.isPasswordMatched(payload.currentPassword, user?.password))
    )
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    // check if new password is same as current password
    if (await User.isPasswordMatched(payload.newPassword, user?.password))
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${user.passwordChangedAt.toLocaleString()}).`
        );

    // check if password is in previous password history
    const newPassword = payload.newPassword;

    // Check if the new password matches any of the previous 2 passwords
    if (
        user.passwordHistory &&
        user.passwordHistory.length > 0 &&
        user.passwordHistory
            .slice(0, 2)
            .some((prevPassword) =>
                bcrypt.compareSync(newPassword, prevPassword.password)
            )
    ) {
        const lastUsedPasswordDate =
            user.passwordHistory[0].updatedAt.toLocaleString();
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${lastUsedPasswordDate}).`
        );
    }

    //hash new password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bcrypt_salt_rounds)
    );

    // Update the password history
    const updatedPasswordHistory = user.passwordHistory || [];
    const passwordHistoryItem = {
        password: user.password,
        updatedAt: user.passwordChangedAt || new Date()
    };

    updatedPasswordHistory.unshift(passwordHistoryItem);

    // store last 2 passwords in passwordHistory array
    if ((updatedPasswordHistory.length as number) > 2) {
        updatedPasswordHistory.pop(); // Remove the oldest password
    }

    const updatedData = await User.findByIdAndUpdate(
        userData?._id,
        {
            password: newHashedPassword,
            passwordChangedAt: new Date(),
            passwordHistory: updatedPasswordHistory
        },
        { new: true }
    );

    return updatedData;
};

export const AuthServices = {
    loginUser,
    changePassword
};
