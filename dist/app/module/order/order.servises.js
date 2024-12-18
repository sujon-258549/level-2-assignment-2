"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServises = void 0;
const car_model_1 = require("../car/car.model");
const order_model_1 = require("./order.model");
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the car by ID
    const inStockCar = yield car_model_1.CarModel.findById(order.car);
    // Validate car stock
    if (!inStockCar ||
        (inStockCar === null || inStockCar === void 0 ? void 0 : inStockCar.inStock) === false ||
        inStockCar.quantity < order.quantity) {
        throw new Error('Car stock is unavailable.');
    }
    // Create the order
    const result = yield order_model_1.OrderModel.create(order);
    return result;
});
exports.orderServises = {
    createOrder,
};
