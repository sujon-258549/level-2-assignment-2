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
const sendImageToCloudinary_1 = require("../../utility/sendImageToCloudinary");
const car_interface_1 = require("./car.interface");
const car_model_1 = require("./car.model");
const mongodb_1 = require("mongodb");
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../Error/appError"));
const shop_model_1 = require("../shop/shop.model");
// Function to create a new car entry
const createCar = (payload, productImage, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existShop = yield shop_model_1.CarShop.findOne({ authorShopId: user.id });
    if (!existShop) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found');
    }
    // @ts-expect-error ids
    payload.shopId = existShop._id;
    if (((_a = productImage === null || productImage === void 0 ? void 0 : productImage.images) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        const uploadedUrls = [];
        for (const img of productImage.images) {
            const name = `${payload.brand}-${Math.floor(Math.random() * 1000)}`;
            const { secure_url } = (yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(name, img.buffer));
            uploadedUrls.push(secure_url);
        }
        payload.image = uploadedUrls;
    }
    const result = yield car_model_1.CarModel.create(payload);
    return result;
});
// Function to find all car data
const findAllCarData = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const car = new builder_1.default(car_model_1.CarModel.find(), query)
        .search(car_interface_1.searchTram)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield car.countTotal();
    const data = yield car.modelQuery;
    return { meta, data };
});
const findAllRegularCarData = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const car = new builder_1.default(car_model_1.CarModel.find({ isOffer: false }), query)
        .search(car_interface_1.searchTram)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield car.countTotal();
    const data = yield car.modelQuery;
    return { meta, data };
});
const offerCar = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const car = new builder_1.default(car_model_1.CarModel.find({ isOffer: true }), query)
        .search(car_interface_1.searchTram)
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
    const result = yield car_model_1.CarModel.findByIdAndDelete(carId); // Convert string _id to ObjectId
    return result;
});
const updateOneCarData = (carId, updateData, productImage) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = productImage === null || productImage === void 0 ? void 0 : productImage.images) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        const uploadedUrls = [];
        for (const img of productImage.images) {
            const name = `${updateData.brand}-${Math.floor(Math.random() * 1000)}`;
            const { secure_url } = (yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(name, img.buffer));
            uploadedUrls.push(secure_url);
        }
        updateData.image = uploadedUrls;
    }
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
    offerCar,
    findAllRegularCarData,
};
