"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const car_router_1 = require("./app/module/car/car.router");
const order_router_1 = require("./app/module/order/order.router");
const app = (0, express_1.default)();
// const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/cars', car_router_1.carRouter);
app.use('/api/orders', order_router_1.orderRouter);
app.get('/', (req, res) => {
    res.send('Assign ment Servise on ');
});
exports.default = app;
