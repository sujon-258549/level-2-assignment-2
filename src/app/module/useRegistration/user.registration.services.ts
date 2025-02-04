import AppError from '../../Error/appError';
import { TLoginUser, TUserRegistration } from './user.registration.interface';
import { UserModel } from './user.registration.model';
import httpStatus from 'http-status';

import bcrypt from 'bcrypt';
import config from '../../config';
import { createToken } from './utils';
// create user
const createdUser = async (payload: TUserRegistration) => {
  const password = payload.password;
  const haspassword = await bcrypt.hash(password, 5);
  console.log(haspassword);
  const result = await UserModel.create({ ...payload, password: haspassword });
  return result;
};
// login user
const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'User with this email does not exist.',
    );
  }

  const matchpassword = await bcrypt.compare(password, existingUser?.password);
  if (!matchpassword) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'User with this password does not exist.',
    );
  }

  const JwtPayload = {
    email: existingUser.email,
    role: existingUser.role as string,
  };

  const token = createToken(
    JwtPayload,
    config.JWT_ACCESS_TOKEN as string,
    config.JWT_ACCESS_TOKEN_EXPIRE_IN_ACCESSION as string,
  );

  return {
    token,
  };
};
export const userRegistrationServices = {
  createdUser,
  loginUser,
};
