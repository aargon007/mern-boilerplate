import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { TUserRole } from '@/modules/user/user.interface';
import { User } from '@/modules/user/user.model';
import catchAsync from '@/shared/catchAsync';
import AppError from '@/errors/AppError';
import config from '@/config';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const authorization = req.headers.authorization;
            const token = authorization?.startsWith('Bearer ')
                ? authorization.slice(7)
                : undefined;

            // if the token is missing throw error
            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'Unauthorized Access',
                    'You do not have the necessary permissions to access this resource.'
                );
            }

            // checking if the given token is valid
            let decoded: JwtPayload;
            try {
                decoded = jwt.verify(
                    token,
                    config.jwt_access_secret
                ) as JwtPayload;
            } catch {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'Invalid or expired access token'
                );
            }

            const { _id, email, role, iat, exp } = decoded;

            // checking if the user is exist
            const user = await User.isUserExists(_id);

            if (!user) {
                throw new AppError(
                    httpStatus.NOT_FOUND,
                    'User not found!',
                    'Please provide valid token!'
                );
            }

            // check if token is issue before password change
            // if (
            //     user.passwordChangedAt &&
            //     User.isJWTIssuedBeforePasswordChanged(
            //         user.passwordChangedAt,
            //         iat as number,
            //     )
            // ) {
            //     throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!", "Please Provide updated token");
            // }

            // check if user has permision
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'You are not authorized!',
                    'You do not have the necessary permissions to access this resource.'
                );
            }

            req.user = decoded as JwtPayload & { role: string };
            next();
        }
    );
};

export default auth;
