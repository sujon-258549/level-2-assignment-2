import { Request, Response } from 'express';
import catchAsync from '../../utility/catchAsync';
import { sendSuccess } from '../../utility/sendSuccess';
import httpStatus from 'http-status';

import { userRegistrationServices } from './user.registration.services';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await userRegistrationServices.createdUser(data);
  sendSuccess(res, {
    statusCod: httpStatus.CREATED,
    success: true,
    message: 'User Registered successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await userRegistrationServices.loginUser(data);
  sendSuccess(res, {
    statusCod: httpStatus.OK,
    success: true,
    message: 'User Login successfully',
    data: result,
  });
});

export const userRegistrationController = { createUser, loginUser };
