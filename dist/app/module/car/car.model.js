"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
const mongoose_1 = require("mongoose");
// Define the Car schema
const carSchema = new mongoose_1.Schema({
    brand: {
        type: String,
        enum: ['Toyota', 'BMW', 'Ford'], // The brand must be one of these values
        required: [true, 'Brand is required'],
        message: '{VALUE} is not a valid car brand',
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'], // Custom validation message
    },
    category: {
        type: String,
        enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], // The category must be one of these values
        required: [true, 'Category is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'Stock status is required'],
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
exports.CarModel = (0, mongoose_1.model)('car-callection', carSchema);
