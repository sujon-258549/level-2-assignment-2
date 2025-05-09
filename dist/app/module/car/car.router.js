"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
const express_1 = __importDefault(require("express"));
const car_controlle_1 = require("./car.controlle");
const auth_1 = __importDefault(require("../../utility/auth"));
const sendImageToCloudinary_1 = require("../../utility/sendImageToCloudinary");
// create router
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('admin'), sendImageToCloudinary_1.upload.fields([{ name: 'images' }]), (req, res, next) => {
    console.log(req.body.data, req.files);
    req.body = JSON.parse(req.body.data);
    next();
}, car_controlle_1.carController.createCar);
router.get('/', car_controlle_1.carController.findAllcarC);
router.get('/regular', car_controlle_1.carController.findAllRegularCarData);
router.get('/offer', car_controlle_1.carController.findOfferCar);
router.get('/:carId', car_controlle_1.carController.findOneCar);
router.put('/:carId', (0, auth_1.default)('admin'), sendImageToCloudinary_1.upload.fields([{ name: 'images' }]), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, car_controlle_1.carController.updateCar);
router.delete('/:carId', (0, auth_1.default)('admin'), car_controlle_1.carController.deleteCar);
exports.carRouter = router;
