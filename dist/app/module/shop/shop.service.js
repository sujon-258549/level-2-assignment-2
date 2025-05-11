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
exports.carShopServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_registration_model_1 = require("../useRegistration/user.registration.model");
const appError_1 = __importDefault(require("../../Error/appError"));
const sendImageToCloudinary_1 = require("../../utility/sendImageToCloudinary");
const shop_model_1 = require("./shop.model");
const createShopIntoDB = (payload, file, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('payload......', payload, file, user);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const isUserExist = yield user_registration_model_1.UserModel.findOne({
            _id: user.id,
        }).session(session);
        if (!isUserExist) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
        if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isShop) {
            throw new appError_1.default(http_status_1.default.FORBIDDEN, 'You are not allowed to create shop');
        }
        const isMealProviderExist = yield shop_model_1.CarShop.findOne({
            authorShopId: user.id,
        }).session(session);
        if (isMealProviderExist) {
            throw new appError_1.default(http_status_1.default.CONFLICT, 'This user already shop create');
        }
        if (file) {
            const path = file.path;
            const name = payload.shopName.replace(/\s+/g, '_').toLowerCase();
            const { secure_url } = (yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(name, path));
            payload.shopLogo = secure_url;
        }
        payload.authorShopId = user.id;
        payload.authorShopId = isUserExist._id;
        const newMealProvider = yield shop_model_1.CarShop.create([payload], { session });
        if (!newMealProvider.length) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Meal Provider');
        }
        // @ts-expect-error shop
        isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isShop = true;
        yield isUserExist.save({ session });
        yield session.commitTransaction();
        yield session.endSession();
        return newMealProvider[0];
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const getMyShopIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_model_1.CarShop.findOne().populate('authorShopId');
    return result;
});
const updateShopIntoDB = (payload, file, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const isExistMealProvider = yield shop_model_1.CarShop.findOne({ authorShopId: user.id });
    if (!isExistMealProvider) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Car shop not found');
    }
    if (file) {
        const path = file.path;
        const name = ((_b = (_a = payload.shopName) === null || _a === void 0 ? void 0 : _a.replace(/\s+/g, '_').toLowerCase()) !== null && _b !== void 0 ? _b : isExistMealProvider.shopName) ||
            isExistMealProvider.shopName;
        const { secure_url } = (yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(name, path));
        if (!secure_url) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to upload image to Cloudinary');
        }
        payload.shopLogo = secure_url;
    }
    const result = yield shop_model_1.CarShop.findOneAndUpdate({ authorShopId: user.id }, payload, {
        new: true,
    });
    return result;
});
exports.carShopServices = {
    createShopIntoDB,
    getMyShopIntoDB,
    updateShopIntoDB,
};
