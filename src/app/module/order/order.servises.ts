import { CarModel } from '../car/car.model';
import { TOrder } from './order.interface';

const createOrder = async (order: TOrder) => {
  console.log(order?.car);
  const car = order?.car;
  // Find the car by ID
  const inStockCar = await CarModel.findById(car);
  //   @ts-expect-error instok car
  const isInstok = inStockCar?.quantity + 1 > order?.quantity;

  // Validate car stock
  if (!inStockCar || inStockCar?.inStock === false || !isInstok) {
    throw new Error('Car stock is unavailable.');
  }

  // Create the order
  //   const result = await OrderModel.create(order);

  //   return result;
};

export const orderServices = {
  createOrder,
};
