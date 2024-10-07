import jwt, { JwtPayload } from 'jsonwebtoken';

interface JWTPayload {
    _id: string;
    email: string;
    role: string;
}

export const createToken = (
    jwtPayload: JWTPayload,
    secret: string,
    expiresIn: string
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn
    });
};

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
};
