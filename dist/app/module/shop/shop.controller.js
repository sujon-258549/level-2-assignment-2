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
exports.ShopControllers = void 0;
const http_status_1 = require("http-status");
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const shop_service_1 = require("./shop.service");
const sendSuccess_1 = require("../../utility/sendSuccess");
const createShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield shop_service_1.carShopServices.createShopIntoDB(data, req.file, req === null || req === void 0 ? void 0 : req.user);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.status.CREATED,
        success: true,
        message: 'shop created successfully',
        data: result,
    });
}));
const getMyShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_service_1.carShopServices.getMyShopIntoDB();
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.status.CREATED,
        success: true,
        message: 'My meal provider retrieved successfully',
        data: result,
    });
}));
const updateShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield shop_service_1.carShopServices.updateShopIntoDB(data, req.file, req === null || req === void 0 ? void 0 : req.user);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.status.CREATED,
        success: true,
        message: 'Meal Provider updated successfully',
        data: result,
    });
}));
exports.ShopControllers = {
    createShop,
    getMyShop,
    updateShop,
};
