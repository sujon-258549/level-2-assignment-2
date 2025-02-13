"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderZodSchema = void 0;
const zod_1 = require("zod");
exports.orderZodSchema = zod_1.z.object({
    car: zod_1.z.string().nonempty({ message: 'Car ID is required' }), // Ensures car ID is a non-empty string
    quantity: zod_1.z
        .number()
        .int({ message: 'Quantity must be an integer' }) // Ensures quantity is an integer
        .min(1, { message: 'Quantity must be at least 1' }), // Validates minimum value
});
exports.default = exports.orderZodSchema;
