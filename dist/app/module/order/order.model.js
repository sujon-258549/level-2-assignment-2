"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true, // Ensure email is provided
    },
    car: {
        //   type: Schema.Types.ObjectId, // Storing the car ID as a string
        type: String, // Storing the car ID as a string
        required: true, // Ensure car ID is provided
    },
    quantity: {
        type: Number,
        required: true, // Ensure quantity is provided
        min: 1, // Minimum quantity is 1
    },
    totalPrice: {
        type: Number,
        required: true, // Ensure totalPrice is provided
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});
// Pre-save middleware to calculate `totalPrice`
// Pre-save middleware to calculate totalPrice
// OrderSchema.pre('save', async function (next) {
//   const order = this;
//   // Fetch car details to get the price
//   const car = await CarModel.findById(order.car);
//   if (!car) {
//     throw new Error('Car not found');
//   }
//   if (!car.inStock) {
//     throw new Error('Car is out of stock');
//   }
//   // Check if the requested quantity exceeds the available stock
//   if (order.quantity >= car.quantity) {
//     throw new Error(
//       `Requested quantity exceeds available stock. Available: ${car.quantity}`,
//     );
//   }
//   // Calculate totalPrice
//   order.totalPrice = car.price * order.quantity;
//   next();
// });
exports.OrderModel = (0, mongoose_1.model)('Order', OrderSchema);
