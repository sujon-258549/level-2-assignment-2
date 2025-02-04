import { CarModel } from '../car/car.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrder = async (order: TOrder) => {
  console.log(order?.car);
  const car = order?.car;
  // Find the car by ID
  const inStockCar = await CarModel.findById(car);
  // Validate car stock
  console.log(inStockCar?.quantity, order?.quantity);
  if (
    !inStockCar ||
    inStockCar?.inStock === false ||
    inStockCar?.quantity > order?.quantity
  ) {
    throw new Error('Car stock is unavailable.');
  }

  // Create the order
  const result = await OrderModel.create(order);

  return result;
};

export const orderServices = {
  createOrder,
};
