import { z } from 'zod';

// body data validation schema during - user creation
export const createUserValidationSchema = z.object({
    body: z.object({
        username: z.string().min(1).max(30),
        email: z.string().email(),
        password: z
            .string()
            .min(8, 'must be at least 8 characters long')
            .max(20, 'Password must be at most 20 characters long.')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
                'not contain at least one uppercase letter, one lowercase letter, and one number'
            ),
        role: z.enum(['user', 'admin']).default('user')
    })
});
