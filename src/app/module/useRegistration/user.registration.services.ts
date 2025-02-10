import AppError from '../../Error/appError';
import { TLoginUser, TUserRegistration } from './user.registration.interface';
import { UserModel } from './user.registration.model';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';
import { createToken } from './utils';
import QueryBuilder from '../../builder/builder';

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

const getAllUser = async (query: Record<string, unknown>) => {
  const orderCar = new QueryBuilder(UserModel.find(), query)
    // .search(searchBleFild)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await orderCar.countTotal();
  const data = await orderCar.modelQuery;
  return { meta, data };
};
const getOneUser = async (_id: string) => {
  const result = await UserModel.findOne({ email: _id });
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
  const comparePassword = await bcrypt.compare(password, hasPasswordData);
  if (!comparePassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Insurrect old Password');
  }
  const newPassword = await bcrypt.hash(payload.newPassword, 5);
  const result = await UserModel.findOneAndUpdate(
    { email: exisEmail?.email },
    { password: newPassword },
  );
  return result;
};

export const userRegistrationServices = {
  createdUser,
  loginUser,
  getAllUser,
  getOneUser,
  changePassword,
};
