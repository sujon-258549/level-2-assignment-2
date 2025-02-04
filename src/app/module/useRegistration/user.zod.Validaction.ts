import { z } from 'zod';

export const loginZodValidation = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, 'Password must be at least 1 characters long'),
  }),
});

export default loginZodValidation;
