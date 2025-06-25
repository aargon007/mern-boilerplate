import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';

interface JWTPayload {
    _id: string;
    email: string;
    role: string;
}

export const createToken = (
    jwtPayload: JWTPayload,
    secret: string,
    expiresIn: number
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn
    });
};

export const verifyToken = (token: string, secret: string): JwtPayload | null => {
    try {
        return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            // Handle expired token specifically
            console.error('Token expired:', error.message);
            // You might want to throw a custom error or return a specific value
            // throw new Error('Token has expired');
        } else if (error instanceof JsonWebTokenError) {
            // Handle other JWT-related errors (e.g., invalid signature)
            console.error('Invalid token:', error.message);
            // throw new Error('Invalid token');
        } else {
            // Handle any other unexpected errors
            console.error('Unexpected error during token verification:', error);
        }
        return null; // Or throw an error, depending on your error handling strategy
    }
};
