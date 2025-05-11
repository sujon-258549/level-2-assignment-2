"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRouters = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../utility/auth"));
const sendImageToCloudinary_1 = require("../../utility/sendImageToCloudinary");
const shop_controller_1 = require("./shop.controller");
const router = (0, express_1.Router)();
router.post('/create-shop', (0, auth_1.default)('admin'), sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, shop_controller_1.ShopControllers.createShop);
router.get('/my-shop', shop_controller_1.ShopControllers.getMyShop);
router.put('/update-shop', (0, auth_1.default)('admin'), sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, shop_controller_1.ShopControllers.updateShop);
exports.shopRouters = router;
