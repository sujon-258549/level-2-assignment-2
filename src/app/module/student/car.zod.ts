import { z } from 'zod';

// Define the Zod schema for a car
const carZodSchemaValidaction = z.object({
  brand: z.enum(['Toyota', 'BMW', 'Ford'], {
    errorMap: () => ({
      message: 'Brand is required and must be one of Toyota, BMW, or Ford',
    }),
  }),
  model: z.string({
    errorMap: () => ({ message: 'Model is required' }),
  }),
  year: z
    .number({
      errorMap: () => ({ message: 'Year is required' }),
    })
    .min(1900, { message: 'Year must be a valid year' }),
  price: z
    .number({
      errorMap: () => ({ message: 'Price is required' }),
    })
    .positive({ message: 'Price must be a positive number' }) // Ensure it's positive
    .min(1, { message: 'Price must be at least 1' }), // Minimum value

  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: () => ({
      message:
        'Category is required and must be one of Sedan, SUV, Truck, Coupe, Convertible',
    }),
  }),
  description: z
    .string({
      errorMap: () => ({ message: 'Description is required' }),
    })
    .min(200, {
      message: 'Description must be at least 200 characters long',
    }),
  quantity: z
    .number({
      errorMap: () => ({ message: 'Quantity is required' }),
    })
    .min(0, { message: 'Quantity must be a non-negative number' }),
  inStock: z.boolean({
    errorMap: () => ({ message: 'Stock status is required' }),
  }),
});

export default carZodSchemaValidaction;
