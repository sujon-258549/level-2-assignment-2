import { Request, Response } from 'express';
import catchAsync from '../../utility/catchAsync';
import { sendSuccess } from '../../utility/sendSuccess';
import httpStatus from 'http-status';

import { userRegistrationServices } from './user.registration.services';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await userRegistrationServices.createdUser(data, req.file);
  sendSuccess(res, {
    statusCod: httpStatus.CREATED,
    success: true,
    message: 'User Registered successfully',
    data: result,
  });
});
const findAllUser = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;
  const result = await userRegistrationServices.getAllUser(query);
  sendSuccess(res, {
    statusCod: httpStatus.OK,
    success: true,
    message: 'All User retrieved successfully',
    meta: result?.meta,
    data: result,
  });
});
const findOneUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userRegistrationServices.getOneUser(id);
  sendSuccess(res, {
    statusCod: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});
const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await userRegistrationServices.getMe(req.user);
  sendSuccess(res, {
    statusCod: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
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
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await userRegistrationServices.changePassword(
    req.headers.authorization as string,
    passwordData,
  );
  sendSuccess(res, {
    statusCod: httpStatus.CREATED,
    success: true,
    message: 'Cheng password is success',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await userRegistrationServices.updateMe(
    data,
    req.file,
    req.user,
  );
  sendSuccess(res, {
    statusCod: httpStatus.CREATED,
    success: true,
    message: 'User update successfully',
    data: result,
  });
});
export const userRegistrationController = {
  createUser,
  loginUser,
  findAllUser,
  findOneUser,
  changePassword,
  getMe,
  updateUser,
};
