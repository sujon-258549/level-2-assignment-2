import { Response } from 'express';

type TSuccess<T> = {
  statusCod: number;
  success: boolean;
  message: string;
  data?: T;
};

export const sendSuccess = <T>(res: Response, data: TSuccess<T>) => {
  res.status(data.statusCod).json({
    success: data.success,
    message: data.message,
    ...(data.data !== undefined && { data: data.data }),
  });
};
