import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from './catchAsync';
import AppError from '../Error/appError';
import config from '../config';
import { UserModel } from '../module/useRegistration/user.registration.model';

export const userRole = {
  user: 'user',
  admin: 'admin',
} as const;

type TUserRole = keyof typeof userRole;
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
    }
    //   validation token
    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_TOKEN as string,
    ) as JwtPayload;
    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
    }
    const { email, role } = decoded;

    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
    }
    //   check is blocked user
    // if (user.isBlocked) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'Your User is Blocked!');
    // }
    //   role check
    // Check for required roles
    console.log(requiredRoles, role);
    if (requiredRoles && !requiredRoles?.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'User does not have the required permissions',
      );
    }
    req.user = decoded;
    // console.log(user);
    // console.log(decoded);

    next();
  });
};

export default auth;
