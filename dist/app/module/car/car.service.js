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
exports.carServices = void 0;
const builder_1 = __importDefault(require("../../builder/builder"));
const car_model_1 = require("./car.model");
const mongodb_1 = require("mongodb");
const searchBleFild = ['brand', 'model', 'category'];
// Function to create a new car entry
const createCar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.create(payload); // Await the save operation to ensure completion
    return result;
});
// Function to find all car data
const findAllCarData = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const car = new builder_1.default(car_model_1.CarModel.find(), query)
        .search(searchBleFild)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield car.countTotal();
    const data = yield car.modelQuery;
    return { meta, data };
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
    console.log(updateData);
    const result = yield car_model_1.CarModel.findByIdAndUpdate(new mongodb_1.ObjectId(carId), updateData, { new: true }); // Convert string _id to ObjectId
    return result;
});
exports.carServices = {
    createCar,
    findAllCarData,
    findOneCarData,
    updateOneCarData,
    deleteSingleCarData,
};
