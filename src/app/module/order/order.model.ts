import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const OrderSchema = new Schema<IOrder>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: 'CarShop',
      required: true,
    },
    quantity: {
      quantity: Number,
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Car',
    },
    color: {
      type: String,
    },

    totalPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    deliveryStatus: {
      type: String,
      enum: ['Pending', 'Delivered'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  },
);

const OrderModel = model<IOrder>('Order', OrderSchema);

export default OrderModel;
