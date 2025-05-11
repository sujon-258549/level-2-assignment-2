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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const sendSuccess_1 = require("../../utility/sendSuccess");
// import { OrderModel } from './order.model';
const order_servises_1 = require("./order.servises");
const http_status_1 = __importDefault(require("http-status"));
const createorder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = req.user;
    console.log(req.body);
    const result = yield order_servises_1.orderServices.createOrder(user, data, req.ip);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.CREATED,
        message: 'Order created successfully',
        success: true,
        data: result,
    });
}));
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_servises_1.orderServices.verifyPayment(req.query.order_id);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.CREATED,
        message: 'Order verified successfully',
        success: true,
        data: order,
    });
}));
const getAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req === null || req === void 0 ? void 0 : req.query;
    const result = yield order_servises_1.orderServices.getAllOrder(data);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        message: 'All Order retrieved successfully',
        success: true,
        meta: result.meta,
        data: result,
    });
}));
const getMyOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = req === null || req === void 0 ? void 0 : req.query;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield order_servises_1.orderServices.getMyOrder(id, data);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        message: 'My Order retrieved successfully',
        success: true,
        meta: result.meta,
        data: result,
    });
}));
const getOneOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('id......................', id);
    const result = yield order_servises_1.orderServices.getOneOrder(id);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        message: 'Order retrieved successfully',
        success: true,
        data: result,
    });
}));
const deleteOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield order_servises_1.orderServices.deleteOrder(id);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        message: 'Order delete successfully',
        success: true,
        data: result,
    });
}));
// const getRevenue = catchAsync(async (req: Request, res: Response) => {
//   const revenue = await OrderModel.aggregate([
//     {
//       $project: {
//         totalPrices: { $multiply: ['$totalPrice', '$quantity'] }, // Calculate total revenue for each document
//       },
//     },
//     {
//       $group: {
//         _id: null, // Group all documents together
//         totalRevenue: { $sum: '$totalPrices' }, // Sum up all calculated revenues
//       },
//     },
//   ]);
//   sendSuccess(res, {
//     statusCod: httpStatus.OK,
//     message: 'Revenue calculated successfully',
//     success: true,
//     data: {
//       totalRevenue: revenue.length > 0 ? revenue[0].totalRevenue : 0, // Handle empty result
//     },
//   });
// });
exports.orderController = {
    createorder,
    //   getRevenue,
    getAllOrder,
    getOneOrder,
    deleteOrder,
    verifyPayment,
    getMyOrder,
};
