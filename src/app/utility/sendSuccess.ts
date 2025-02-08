import { Response } from 'express';
type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
type TSuccess<T> = {
  statusCod: number;
  success: boolean;
  message: string;
  meta?: TMeta;
  data?: T;
};

export const sendSuccess = <T>(res: Response, data: TSuccess<T>) => {
  res.status(data.statusCod).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    ...(data.data !== undefined && { data: data.data }),
  });
};
