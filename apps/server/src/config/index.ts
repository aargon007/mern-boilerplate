import dotenv from 'dotenv';
import path from 'node:path';
import { z } from 'zod';

// Keep local development settings at the workspace root. Deployment uses process.env.
dotenv.config({
    path: path.resolve(__dirname, '../../../../.env'),
    quiet: true
});

const duration = z
    .string()
    .regex(/^\d+(s|m|h|d)?$/)
    .transform((value) => {
        const unit = value.slice(-1);
        const multiplier =
            ({ s: 1, m: 60, h: 3600, d: 86400 } as Record<string, number>)[
                unit
            ] ?? 1;
        return parseInt(value, 10) * multiplier;
    })
    .pipe(z.number().positive());

const result = z
    .object({
        NODE_ENV: z
            .enum(['development', 'production', 'test'])
            .default('development'),
        PORT: z.coerce.number().int().min(1).max(65535).default(5001),
        DB_URI: z.string().min(1),
        BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(4).max(31).default(10),
        JWT_ACCESS_SECRET: z.string().min(1),
        JWT_REFRESH_SECRET: z.string().min(1),
        JWT_ACCESS_EXPIRES_IN: duration.prefault('15m'),
        JWT_REFRESH_EXPIRES_IN: duration.prefault('7d'),
        CLIENT_ORIGIN: z.url().default('http://localhost:5173')
    })
    .safeParse(process.env);

if (!result.success) {
    throw new Error(
        `Invalid server environment: ${result.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join('; ')}`
    );
}

const env = result.data;
export default {
    NODE_ENV: env.NODE_ENV,
    port: env.PORT,
    database_url: env.DB_URI,
    bcrypt_salt_rounds: env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: env.JWT_REFRESH_EXPIRES_IN,
    CLIENT_ORIGIN: env.CLIENT_ORIGIN
};
