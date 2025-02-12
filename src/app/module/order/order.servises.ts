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

  if (!payload?.products?.length) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');
  }

  let totalPrice = 0;
  const productDetails = (
    await Promise.all(
      payload.products.map(async (item) => {
        const product = await CarModel.findById(item.car);

        if (product && product.inStock && product.quantity >= item.quantity) {
          totalPrice += (product.price || 0) * item.quantity;
          return { car: product._id, quantity: item.quantity };
        } else {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            `Car ID ${item.car} is out of stock`,
          );
        }
      }),
    )
  ).filter(Boolean); // Remove undefined entries

  // Create the order
  let order = await OrderModel.create({
    user: existUser._id,
    products: productDetails,
    totalPrice,
  });

  // Payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: existUser.name,
    customer_address: 'Bangladesh',
    customer_email: existUser.email,
    customer_phone: '+8801790876529',
    customer_city: 'Rangpur Bangladesh',
    client_ip,
  };

  const payment = await orderUtils.makePayment(shurjopayPayload);

  console.log('payment', payment?.transactionStatus);

  if (payment?.transactionStatus) {
    order = await OrderModel.findByIdAndUpdate(
      order._id,
      {
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      },
      { new: true }, // Return updated order
    );
  }

  return payment.checkout_url;
};

// const verifyPayment = async (order_id: string) => {
//   const verifiedPayment = await orderUtils.verifyPayment(order_id);

//   if (verifiedPayment?.length) {
//     await OrderModel.findOneAndUpdate(
//       {
//         'transaction.id': order_id,
//       },
//       {
//         'transaction.bank_status': verifiedPayment[0].bank_status,
//         'transaction.sp_code': verifiedPayment[0].sp_code,
//         'transaction.sp_message': verifiedPayment[0].sp_message,
//         'transaction.transactionStatus': verifiedPayment[0]?.transaction_status,
//         'transaction.method': verifiedPayment[0].method,
//         'transaction.date_time': verifiedPayment[0].date_time,
//         status:
//           verifiedPayment[0].bank_status == 'Success'
//             ? 'Paid'
//             : verifiedPayment[0].bank_status == 'Failed'
//               ? 'Pending'
//               : verifiedPayment[0].bank_status == 'Cancel'
//                 ? 'Cancelled'
//                 : '',
//       },
//     );
//   }

//   return verifiedPayment;
// };
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPayment(order_id);

  if (Array.isArray(verifiedPayment) && verifiedPayment.length > 0) {
    const paymentData = verifiedPayment[0]; // Avoid repeated indexing

    await OrderModel.findOneAndUpdate(
      { 'transaction.id': order_id },
      {
        $set: {
          'transaction.bank_status': paymentData.bank_status ?? '',
          'transaction.sp_code': paymentData.sp_code ?? '',
          'transaction.sp_message': paymentData.sp_message ?? '',
          'transaction.transactionStatus': paymentData.transaction_status ?? '',
          'transaction.method': paymentData.method ?? '',
          'transaction.date_time': paymentData.date_time ?? '',
          status:
            paymentData.bank_status === 'Success'
              ? 'Paid'
              : paymentData.bank_status === 'Failed'
                ? 'Pending'
                : paymentData.bank_status === 'Cancel'
                  ? 'Cancelled'
                  : 'Unknown',
        },
      },
      { new: true }, // Return updated document
    );
  }

  return verifiedPayment;
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
  verifyPayment,
};
