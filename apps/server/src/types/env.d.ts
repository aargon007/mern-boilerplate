/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Secret } from "jsonwebtoken";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "production" | "development";
            PORT: number;
            DB_URI: string;

            BCRYPT_SALT_ROUNDS: number;
            JWT_ACCESS_SECRET: Secret;
            JWT_REFRESH_SECRET: Secret;
            JWT_ACCESS_EXPIRES_IN: number;
            JWT_REFRESH_EXPIRES_IN: number;
        }
    }
}