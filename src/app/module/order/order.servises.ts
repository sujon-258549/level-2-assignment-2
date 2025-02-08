import QueryBuilder from '../../builder/builder';
import { CarModel } from '../car/car.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

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

const getAllOrder = async (query: Record<string, unknown>) => {
  const orderCar = new QueryBuilder(OrderModel.find(), query)
    // .search(searchBleFild)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await orderCar.countTotal();
  const data = await orderCar.modelQuery;
  return { meta, data };
};
const getOneOrder = async (id: string) => {
  const result = await OrderModel.findById(id);
  return result;
};
const deleteOrder = async (id: string) => {
  const result = await OrderModel.findByIdAndDelete(id);
  return result;
};

export const orderServices = {
  createOrder,
  getAllOrder,
  getOneOrder,
  deleteOrder,
};
