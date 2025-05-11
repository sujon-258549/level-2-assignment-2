import { status } from 'http-status';

import { Request, Response } from 'express';
import catchAsync from '../../utility/catchAsync';
import { carShopServices } from './shop.service';
import { sendSuccess } from '../../utility/sendSuccess';

const createShop = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await carShopServices.createShopIntoDB(
    data,
    req.file,
    req?.user,
  );

  sendSuccess(res, {
    statusCod: status.CREATED,
    success: true,
    message: 'shop created successfully',
    data: result,
  });
});

const getMyShop = catchAsync(async (req: Request, res: Response) => {
  const result = await carShopServices.getMyShopIntoDB();
  sendSuccess(res, {
    statusCod: status.CREATED,
    success: true,
    message: 'My meal provider retrieved successfully',
    data: result,
  });
});
const updateShop = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await carShopServices.updateShopIntoDB(
    data,
    req.file,
    req?.user,
  );
  sendSuccess(res, {
    statusCod: status.CREATED,
    success: true,
    message: 'Meal Provider updated successfully',
    data: result,
  });
});

export const ShopControllers = {
  createShop,
  getMyShop,
  updateShop,
};
