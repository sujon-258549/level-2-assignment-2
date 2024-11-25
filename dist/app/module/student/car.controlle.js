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
const car_servise_1 = require("./car.servise");
const car_zod_1 = __importDefault(require("./car.zod"));
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.car;
        // zod validaction
        const zodValidactionCar = car_zod_1.default.parse(data);
        const result = yield car_servise_1.carServises.createCar(zodValidactionCar);
        res.status(200).json({
            seccess: true,
            message: 'Car create success',
            result: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating Car',
            error: error,
        });
    }
});
const findAllcarC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield car_servise_1.carServises.findAllCarData();
        res.status(200).json({
            success: true,
            message: 'Cars retrieved successfully',
            result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: true,
            message: 'Cars retrieved error',
            error: error.details || error.message || 'An unexpected error occurred',
        });
    }
});
const findOneCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const result = yield car_servise_1.carServises.findOneCarData(carId);
        res.status(200).json({
            success: true,
            message: 'Cars retrieved successfully',
            result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: true,
            message: 'Cars retrieved error',
            error: error.details || error.message || 'An unexpected error occurred',
        });
    }
});
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params; // Get carId from URL params
        const updateData = req.body; // Get data to update from the request body
        const updatedCar = yield car_servise_1.carServises.updateOneCarData(carId, updateData); // Call the update function
        // Return success response with the updated car data
        res.status(200).json({
            success: true,
            message: 'Car updated successfully',
            result: updatedCar,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update car',
            error: error.message || 'An unexpected error occurred',
        });
    }
});
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params; // Get carId from URL params
        yield car_servise_1.carServises.deleteSingleCarData(carId); // Call the update function
        // Return success response with the updated car data
        res.status(200).json({
            success: true,
            message: 'Car Delete  successfully',
            result: {},
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to Deleted car',
            error: error.message || 'Failed to Deleted car',
        });
    }
});
exports.carController = {
    createCar,
    findAllcarC,
    findOneCar,
    updateCar,
    deleteCar,
};
