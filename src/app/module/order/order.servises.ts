import { CarModel } from '../car/car.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrder = async (order: TOrder) => {
  // Find the car by ID
  const inStockCar = await CarModel.findById(order.car);
  // Validate car stock
  if (
    !inStockCar ||
    inStockCar?.inStock === false ||
    inStockCar.quantity < order.quantity
  ) {
    throw new Error('Car stock is unavailable.');
  }

  // Create the order
  const result = await OrderModel.create(order);

  return result;
};

export const orderServises = {
  createOrder,
};
