import catchAsync from '../../utility/catchAsync';
import { sendSuccess } from '../../utility/sendSuccess';
// import { OrderModel } from './order.model';
import { orderServices } from './order.servises';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const createorder = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const user = req.user;
  console.log(req.body);
  const result = await orderServices.createOrder(user, data, req.ip!);
  sendSuccess(res, {
    statusCod: httpStatus.CREATED,
    message: 'Order created successfully',
    success: true,
    data: result,
  });
});
const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderServices.verifyPayment(req.query.order_id as string);
  sendSuccess(res, {
    statusCod: httpStatus.CREATED,
    message: 'Order verified successfully',
    success: true,
    data: order,
  });
});
const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const data = req?.query;
  const result = await orderServices.getAllOrder(data);
  sendSuccess(res, {
    statusCod: httpStatus.OK,
    message: 'All Order retrieved successfully',
    success: true,
    meta: result.meta,
    data: result,
  });
});
const getMyOrder = catchAsync(async (req: Request, res: Response) => {
  const data = req?.query;
  const id = req?.user?.id;
  const result = await orderServices.getMyOrder(id, data);
  sendSuccess(res, {
    statusCod: httpStatus.OK,
    message: 'My Order retrieved successfully',
    success: true,
    meta: result.meta,
    data: result,
  });
});
const getOneOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('id......................', id);
  const result = await orderServices.getOneOrder(id);
  sendSuccess(res, {
    statusCod: httpStatus.OK,
    message: 'Order retrieved successfully',
    success: true,
    data: result,
  });
});
const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderServices.deleteOrder(id);
  sendSuccess(res, {
    statusCod: httpStatus.OK,
    message: 'Order delete successfully',
    success: true,
    data: result,
  });
});

// const getRevenue = catchAsync(async (req: Request, res: Response) => {
//   const revenue = await OrderModel.aggregate([
//     {
//       $project: {
//         totalPrices: { $multiply: ['$totalPrice', '$quantity'] }, // Calculate total revenue for each document
//       },
//     },
//     {
//       $group: {
//         _id: null, // Group all documents together
//         totalRevenue: { $sum: '$totalPrices' }, // Sum up all calculated revenues
//       },
//     },
//   ]);

//   sendSuccess(res, {
//     statusCod: httpStatus.OK,
//     message: 'Revenue calculated successfully',
//     success: true,
//     data: {
//       totalRevenue: revenue.length > 0 ? revenue[0].totalRevenue : 0, // Handle empty result
//     },
//   });
// });

export const orderController = {
  createorder,
  //   getRevenue,
  getAllOrder,
  getOneOrder,
  deleteOrder,
  verifyPayment,
  getMyOrder,
};
