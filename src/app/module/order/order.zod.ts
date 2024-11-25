import { z } from 'zod';

export const orderZodSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }), // Validates email format and non-empty
  car: z.string().nonempty({ message: 'Car ID is required' }), // Ensures car ID is a non-empty string
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer' }) // Ensures quantity is an integer
    .min(1, { message: 'Quantity must be at least 1' }), // Validates minimum value
  totalPrice: z
    .number()
    .min(0, { message: 'Total price must be a positive number' }) // Ensures totalPrice is a positive number
    .nonnegative({ message: 'Total price cannot be negative' }), // Additional check for non-negativity
});

export default orderZodSchema;
