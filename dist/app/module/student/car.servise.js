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
exports.carServises = void 0;
const car_model_1 = require("./car.model");
const mongodb_1 = require("mongodb");
// Function to create a new car entry
const createCar = (carsData) => __awaiter(void 0, void 0, void 0, function* () {
    const car = new car_model_1.CarModel(carsData);
    const result = yield car.save(); // Await the save operation to ensure completion
    return result;
});
// Function to find all car data
const findAllCarData = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let searchTerm = '';
    if (query.searchTerm) {
        searchTerm = query.searchTerm;
    }
    const result = yield car_model_1.CarModel.find({
        $or: ['brand', 'model', 'category'].map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' },
        })),
    });
    return result;
});
// Function to find a car by its ID
const findOneCarData = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    // Use lowercase 'string' for consistency
    const result = yield car_model_1.CarModel.findOne({ _id: new mongodb_1.ObjectId(carId) }); // Convert string _id to ObjectId
    return result;
});
const deleteSingleCarData = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    // Use lowercase 'string' for consistency
    const result = yield car_model_1.CarModel.findByIdAndDelete({
        _id: new mongodb_1.ObjectId(carId),
    }); // Convert string _id to ObjectId
    return result;
});
const updateOneCarData = (carId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    // Use lowercase 'string' for consistency
    const result = yield car_model_1.CarModel.findByIdAndUpdate(new mongodb_1.ObjectId(carId), updateData, { new: true }); // Convert string _id to ObjectId
    return result;
});
exports.carServises = {
    createCar,
    findAllCarData,
    findOneCarData,
    updateOneCarData,
    deleteSingleCarData,
};
