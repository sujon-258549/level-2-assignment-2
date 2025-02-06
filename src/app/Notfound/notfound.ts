/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { sendSuccess } from '../utility/sendSuccess';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const statusCod = 500;
  const message = 'Router is Notfound!';

  sendSuccess(res, {
    statusCod: httpStatus.INTERNAL_SERVER_ERROR,
    success: false,
    message: 'Please enter the correct route.',
  });
};

export default notFound;
