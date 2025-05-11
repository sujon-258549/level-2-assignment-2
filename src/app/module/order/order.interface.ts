// email (string): The email address of the customer.
// car (ObjectId): The car ordered. (unused ref) (enter the created carId from your database which car you would love to buy).
// quantity (number): The quantity of the ordered car.
// totalPrice (number): The total price (car price * quantity).
// import { Types } from 'mongoose';
// export interface TOrder {
//   car: string; // Reference to the car ID in the database
//   quantity: number; // Quantity of the ordered car
// }

// export interface TUserInfo {
//   email?: string;
//   name?: string;
// }

// export interface TTotalPrice {
//   totalPrice: number;
// }

import { Document, Types } from 'mongoose';

export interface IOrder extends Document {
  customerId: Types.ObjectId;
  shopId?: Types.ObjectId;
  quantity?: number;
  color?: string;
  totalPrice: number;
  productId: Types.ObjectId;
  paymentStatus: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  deliveryStatus?: 'Pending' | 'Delivered';
  transaction: {
    id: string;
    transactionStatus?: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export type TOrder = {
  car: Types.ObjectId;
  quantity: number;
};
