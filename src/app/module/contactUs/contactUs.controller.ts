import { Request, Response } from 'express';
import status from 'http-status';
import { contactServices } from './contactUs.services';
import { sendSuccess } from '../../utility/sendSuccess';
import catchAsync from '../../utility/catchAsync';
const createContact = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await contactServices.createContactIntoDB(req.body);

  sendSuccess(res, {
    statusCod: status.OK,
    success: true,
    message: 'Contact created successfully',
    data: result,
  });
});
const singleContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await contactServices.singleContactIntoDB(id);
  sendSuccess(res, {
    statusCod: status.OK,
    success: true,
    message: 'Contact created successfully',
    data: result,
  });
});
const contactForMe = catchAsync(async (req: Request, res: Response) => {
  const result = await contactServices.contactForMeIntoDB(req.query);

  sendSuccess(res, {
    statusCod: status.OK,
    success: true,
    message: 'Contact created successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const contactController = { createContact, singleContact, contactForMe };
