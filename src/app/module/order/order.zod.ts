import { z } from 'zod';

export const orderZodSchema = z.object({
  car: z.string().nonempty({ message: 'Car ID is required' }), // Ensures car ID is a non-empty string
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer' }) // Ensures quantity is an integer
    .min(1, { message: 'Quantity must be at least 1' }), // Validates minimum value
});

export default orderZodSchema;
