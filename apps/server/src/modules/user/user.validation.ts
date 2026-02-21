import { z } from 'zod';

export const createUserValidationSchema = z.object({
    body: z.object({
        username: z
            .string()
            .trim()
            .min(1, 'Username is required.')
            .max(30, 'Username must be at most 30 characters long.'),
        email: z
            .email({error:"Email is required."})
            .min(1, 'Email is required.')
            .max(50, 'Email must be at most 50 characters long.')
            .toLowerCase()
            .trim(),
        password: z
            .string()
            .trim()
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
                'Password must be 8-20 characters and include at least one uppercase letter, one lowercase letter, and one number.'
            ),
        role: z.enum(['user', 'admin']).default('user'),
    }),
});
