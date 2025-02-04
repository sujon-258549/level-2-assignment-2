/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';
import { CarModel } from '../car/car.model';
import AppError from '../../Error/appError';
import httpStatus from 'http-status';

const OrderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true, // Ensure email is provided
    },
    car: {
      //   type: Schema.Types.ObjectId, // Storing the car ID as a string
      type: String, // Storing the car ID as a string
      required: true, // Ensure car ID is provided
    },

    quantity: {
      type: Number,
      required: true, // Ensure quantity is provided
      min: 1, // Minimum quantity is 1
    },
    totalPrice: {
      type: Number,
      required: true, // Ensure totalPrice is provided
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

// Pre-save middleware to calculate `totalPrice`

// Pre-save middleware to calculate totalPrice
OrderSchema.pre('save', async function (next) {
  const order = this;
  // Fetch car details to get the price
  const car = await CarModel.findById(order.car);

  if (!car) {
    throw new AppError(httpStatus.OK, 'Car not found');
  }

  if (!car.inStock) {
    throw new AppError(httpStatus.OK, 'Car out of stock');
  }

  // Check if the requested quantity exceeds the available stock
  if (order.quantity >= car.quantity) {
    throw new Error(
      `Requested quantity exceeds available stock. Available: ${car.quantity}`,
    );
  }
  // Calculate totalPrice
  order.totalPrice = car.price * order.quantity;
  next();
});

export const OrderModel = model<TOrder>('Order', OrderSchema);
