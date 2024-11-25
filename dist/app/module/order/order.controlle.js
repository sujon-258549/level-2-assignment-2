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
exports.orderController = void 0;
const order_model_1 = require("./order.model");
const order_servises_1 = require("./order.servises");
const order_zod_1 = require("./order.zod");
const createorder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log()
    try {
        const data = req.body;
        const orderZoodvalidaction = order_zod_1.orderZodSchema.parse(data);
        const result = yield order_servises_1.orderServises.createOrder(orderZoodvalidaction);
        res.status(200).json({
            seccess: true,
            message: 'Order create success',
            result: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating Order',
            error: error,
        });
    }
});
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenue = yield order_model_1.OrderModel.aggregate([
            {
                $group: {
                    _id: null, // Group all documents
                    totalRevenue: { $sum: '$totalPrice' },
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully',
            data: revenue.length > 0 ? revenue[0].totalRevenue : 0, // Handle empty result
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error calculating revenue',
            error: error.message,
        });
    }
});
exports.orderController = {
    createorder,
    getRevenue,
};
