"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
const express_1 = __importDefault(require("express"));
const car_controlle_1 = require("./car.controlle");
// create router
const router = express_1.default.Router();
router.post('/create-car', car_controlle_1.carController.createCar);
router.get('/', car_controlle_1.carController.findAllcarC);
router.get('/:carId', car_controlle_1.carController.findOneCar);
router.put('/:carId', car_controlle_1.carController.updateCar);
router.delete('/:carId', car_controlle_1.carController.deleteCar);
exports.carRouter = router;
