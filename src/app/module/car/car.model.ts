import { model, Schema } from 'mongoose';
import { TCar } from './car.interface';

// Define the Car schema
const carSchema = new Schema<TCar>(
  {
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
    image: {
      type: String,
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
      required: [false, 'Quantity is required'],
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

export const CarModel = model<TCar>('car-callection', carSchema);
