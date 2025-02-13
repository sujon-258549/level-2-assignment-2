"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the Zod schema for a car
const carZodSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        brand: zod_1.z.enum(['Toyota', 'BMW', 'Ford'], {
            errorMap: () => ({
                message: 'Brand is required and must be one of Toyota, BMW, or Ford',
            }),
        }),
        model: zod_1.z.string({
            errorMap: () => ({ message: 'Model is required' }),
        }),
        year: zod_1.z
            .number({
            errorMap: () => ({ message: 'Year is required' }),
        })
            .min(1900, { message: 'Year must be a valid year' }),
        price: zod_1.z
            .number({
            errorMap: () => ({ message: 'Price is required' }),
        })
            .positive({ message: 'Price must be a positive number' }) // Ensure it's positive
            .min(1, { message: 'Price must be at least 1' }), // Minimum value
        category: zod_1.z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
            errorMap: () => ({
                message: 'Category is required and must be one of Sedan, SUV, Truck, Coupe, Convertible',
            }),
        }),
        description: zod_1.z.string({
            errorMap: () => ({ message: 'Description is required' }),
        }),
        quantity: zod_1.z
            .number({
            errorMap: () => ({ message: 'Quantity is required' }),
        })
            .min(0, { message: 'Quantity must be a non-negative number' }),
    }),
});
exports.default = carZodSchemaValidation;
