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
exports.carController = void 0;
const car_service_1 = require("./car.service");
const sendSuccess_1 = require("../../utility/sendSuccess");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const createCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield car_service_1.carServices.createCar(data);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.CREATED,
        success: true,
        message: 'Car created successfully',
        data: result,
    });
}));
const findAllcarC = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_service_1.carServices.findAllCarData(req.query);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'Cars retrieved successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result,
    });
}));
const findOneCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req.params;
    const result = yield car_service_1.carServices.findOneCarData(carId);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'Cars retrieved successfully',
        data: result,
    });
}));
// update course
const updateCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req.params; // Get carId from URL params
    const updateData = req.body; // Get data to update from the request body
    const updatedCar = yield car_service_1.carServices.updateOneCarData(carId, updateData); // Call the update function
    // Return success response with the updated car data
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.CREATED,
        success: true,
        message: 'Car updated successfully',
        data: updatedCar,
    });
}));
const deleteCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = req.params; // Get carId from URL params
    yield car_service_1.carServices.deleteSingleCarData(carId); // Call the update function
    // Return success response with the updated car data
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'Car Delete  successfully',
    });
}));
exports.carController = {
    createCar,
    findAllcarC,
    findOneCar,
    updateCar,
    deleteCar,
};
