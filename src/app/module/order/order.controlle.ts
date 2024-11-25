import { OrderModel } from './order.model';
import { orderServises } from './order.servises';
import { orderZodSchema } from './order.zod';
import { Request, Response } from 'express';

const createorder = async (req: Request, res: Response) => {
  //   console.log()

  try {
    const data = req.body;

    const orderZoodvalidaction = orderZodSchema.parse(data);
    const result = await orderServises.createOrder(orderZoodvalidaction);
    res.status(200).json({
      seccess: true,
      message: 'Order create success',
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating Order',
      error: error,
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await OrderModel.aggregate([
      {
        $group: {
          _id: null, // Group all documents
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: revenue.length > 0 ? revenue[0].totalRevenue : 0, // Handle empty result
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error calculating revenue',
      error: error.message,
    });
  }
};

export const orderController = {
  createorder,
  getRevenue,
};
