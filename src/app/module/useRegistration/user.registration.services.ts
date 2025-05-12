/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../Error/appError';
import { TLoginUser, TUserRegistration } from './user.registration.interface';
import { UserModel } from './user.registration.model';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as argon2 from 'argon2';
import config from '../../config';
import { createToken } from './utils';
import QueryBuilder from '../../builder/builder';
import { sendImageToCloudinary } from '../../utility/sendImageToCloudinary';
const searchBleFild = ['name', 'email'];
// create user
const createdUser = async (payload: TUserRegistration, file: any) => {
  console.log(file, payload);
  if (file) {
    const path = file.buffer;
    const name = payload.firstName.replace(/\s+/g, '_').toLowerCase();

    const { secure_url } = (await sendImageToCloudinary(name, path)) as {
      secure_url: string;
    };

    payload.profileImage = secure_url;
  }

  const result = await UserModel.create(payload);
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

  const matchpassword = await argon2.verify(existingUser?.password, password);
  if (!matchpassword) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'User with this password does not exist.',
    );
  }

  const JwtPayload = {
    email: existingUser.email,
    role: existingUser.role as string,
    id: existingUser._id,
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

const getAllUser = async (query: Record<string, unknown>) => {
  const orderCar = new QueryBuilder(UserModel.find({ role: 'user' }), query)
    .search(searchBleFild)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await orderCar.countTotal();
  const data = await orderCar.modelQuery;
  return { meta, data };
};
const getOneUser = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};
const getMe = async (user: JwtPayload) => {
  console.log(user);
  const result = await UserModel.findOne({ email: user.email });
  return result;
};
const changePassword = async (
  token: string,
  payload: { oldPassword: string; newPassword: string },
) => {
  console.log({ payload, token });
  const decoded = jwt.verify(
    token,
    config.JWT_ACCESS_TOKEN as string,
  ) as JwtPayload;
  if (!decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
  }
  const { email } = decoded;
  const exisEmail = await UserModel.findOne({ email: email });
  if (!exisEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Email');
  }

  const password = payload?.oldPassword;
  const hasPasswordData = exisEmail.password;
  const comparePassword = await argon2.verify(hasPasswordData, password);
  if (!comparePassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Insurrect old Password');
  }
  const newPassword = await argon2.hash(payload.newPassword);
  const result = await UserModel.findOneAndUpdate(
    { email: exisEmail?.email },
    { password: newPassword },
  );
  return result;
};

const updateMe = async (
  payload: Partial<TUserRegistration>,
  file: any,
  user: JwtPayload,
) => {
  if (file) {
    const path = file.buffer;
    const name = payload.firstName as string;

    const { secure_url } = (await sendImageToCloudinary(name, path)) as {
      secure_url: string;
    };

    payload.profileImage = secure_url;
  }

  const result = await UserModel.findOneAndUpdate(
    { email: user.email },
    payload,
  );
  return result;
};

export const userRegistrationServices = {
  createdUser,
  loginUser,
  getAllUser,
  getOneUser,
  changePassword,
  getMe,
  updateMe,
};
