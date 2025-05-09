"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    shopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'CarShop',
        required: true,
    },
    quantity: {
        quantity: Number,
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const OrderModel = (0, mongoose_1.model)('Order', OrderSchema);
exports.default = OrderModel;
