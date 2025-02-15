/* eslint-disable @typescript-eslint/no-explicit-any */
import Shurjopay, { PaymentResponse } from 'shurjopay';
import config from '../../config';

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp.sp_endpoint!,
  config.sp.sp_username!,
  config.sp.sp_password!,
  config.sp.sp_prefix!,
  config.sp.sp_return_url!,
);

const makePayment = async (
  makePaymentPayload: any,
): Promise<PaymentResponse> => {
  return new Promise((resolve, rejects) => {
    shurjopay.makePayment(
      makePaymentPayload,
      (response) => resolve(response),
      (error) => rejects(error),
    );
  });
  //   const paymentResult = await shurjopay.makePayment(
  //     makePaymentPayload,
  //     (response) => console.log(response),
  //     (error) => console.log(error),
  //   );
  //   return paymentResult;
};

const verifyPayment = (order_id: string) => {
  return new Promise((resolve, rejects) => {
    shurjopay.verifyPayment(
      order_id,
      (response) => resolve(response),
      (error) => rejects(error),
    );
  });
};

export const orderUtils = {
  makePayment,
  verifyPayment,
};
