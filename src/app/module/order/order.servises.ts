import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrder = async (order: TOrder) => {
  try {
    const result = await OrderModel.create(order);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const orderServises = {
  createOrder,
};
