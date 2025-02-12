import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/builder';
import { CarModel } from '../car/car.model';
import { UserModel } from '../useRegistration/user.registration.model';
import AppError from '../../Error/appError';
import httpStatus from 'http-status';
import { orderUtils } from './order.utils';
import OrderModel from './order.model';

const createOrder = async (
  userData: JwtPayload,
  payload: { products: { car: string; quantity: number }[] },
  client_ip: string,
) => {
  const existUser = await UserModel.findOne({ email: userData?.email });
  if (!existUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not Exist');
  }
  console.log(existUser);

  // //   const carData = payload?.products?.car;

  //   // Find the car by ID
  //   const inStockCar = await CarModel.findById(product?.car);

  //   //   @ts-expect-error instok car
  //   const isInstok = inStockCar?.quantity + 1 > payload?.quantity;

  //   // Validate car stock
  //   if (!inStockCar || inStockCar?.inStock === false || !isInstok) {
  //     throw new Error('Car stock is unavailable.');
  //   }

  //   const totalPrice = inStockCar.price * payload?.products?.quantity;
  //   //   console.log({ userData, inStockCar });

  //   Create the order

  if (!payload?.products?.length)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await CarModel.findById(item.car);

      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );
  console.log(productDetails);
  const order = await OrderModel.create({
    user: existUser._id,
    products: productDetails,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: existUser.name,
    customer_address: 'Bangladesh',
    customer_email: existUser.email,
    customer_phone: '+8801790876529',
    customer_city: 'Ragnpur Bangladesh',
    client_ip,
  };
  const payment = await orderUtils.makePayment(shurjopayPayload);
  return { order, payment };
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
