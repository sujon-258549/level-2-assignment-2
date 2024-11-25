"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controlle_1 = require("./order.controlle");
const router = express_1.default.Router();
router.post('/', order_controlle_1.orderController.createorder);
router.get('/revenue', order_controlle_1.orderController.getRevenue);
exports.orderRouter = router;
