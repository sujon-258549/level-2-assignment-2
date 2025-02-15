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
exports.orderServices = void 0;
const builder_1 = __importDefault(require("../../builder/builder"));
const car_model_1 = require("../car/car.model");
const user_registration_model_1 = require("../useRegistration/user.registration.model");
const appError_1 = __importDefault(require("../../Error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const order_utils_1 = require("./order.utils");
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (userData, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existUser = yield user_registration_model_1.UserModel.findOne({ email: userData === null || userData === void 0 ? void 0 : userData.email });
    if (!existUser) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User not Exist');
    }
    console.log(existUser);
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length)) {
        throw new appError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Order is not specified');
    }
    let totalPrice = 0;
    const productDetails = (yield Promise.all(payload.products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield car_model_1.CarModel.findById(item.car);
        if (product && product.inStock && product.quantity >= item.quantity) {
            totalPrice += (product.price || 0) * item.quantity;
            return { car: product._id, quantity: item.quantity };
        }
        else {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, `Car ID ${item.car} is out of stock`);
        }
    })))).filter(Boolean); // Remove undefined entries
    // Create the order
    let order = yield order_model_1.default.create({
        user: existUser._id,
        products: productDetails,
        totalPrice,
    });
    // Payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: 'BDT',
        customer_name: existUser.name,
        customer_address: 'Bangladesh',
        customer_email: existUser.email,
        customer_phone: '+8801790876529',
        customer_city: 'Rangpur Bangladesh',
        client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePayment(shurjopayPayload);
    console.log('payment', payment === null || payment === void 0 ? void 0 : payment.transactionStatus);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        // @ts-expect-error order
        order = yield order_model_1.default.findByIdAndUpdate(order._id, {
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        }, { new: true });
    }
    return payment.checkout_url;
});
// const verifyPayment = async (order_id: string) => {
//   const verifiedPayment = await orderUtils.verifyPayment(order_id);
//   if (verifiedPayment?.length) {
//     await OrderModel.findOneAndUpdate(
//       {
//         'transaction.id': order_id,
//       },
//       {
//         'transaction.bank_status': verifiedPayment[0].bank_status,
//         'transaction.sp_code': verifiedPayment[0].sp_code,
//         'transaction.sp_message': verifiedPayment[0].sp_message,
//         'transaction.transactionStatus': verifiedPayment[0]?.transaction_status,
//         'transaction.method': verifiedPayment[0].method,
//         'transaction.date_time': verifiedPayment[0].date_time,
//         status:
//           verifiedPayment[0].bank_status == 'Success'
//             ? 'Paid'
//             : verifiedPayment[0].bank_status == 'Failed'
//               ? 'Pending'
//               : verifiedPayment[0].bank_status == 'Cancel'
//                 ? 'Cancelled'
//                 : '',
//       },
//     );
//   }
//   return verifiedPayment;
// };
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPayment(order_id);
    if (Array.isArray(verifiedPayment) && verifiedPayment.length > 0) {
        const paymentData = verifiedPayment[0]; // Avoid repeated indexing
        yield order_model_1.default.findOneAndUpdate({ 'transaction.id': order_id }, {
            $set: {
                'transaction.bank_status': (_a = paymentData.bank_status) !== null && _a !== void 0 ? _a : '',
                'transaction.sp_code': (_b = paymentData.sp_code) !== null && _b !== void 0 ? _b : '',
                'transaction.sp_message': (_c = paymentData.sp_message) !== null && _c !== void 0 ? _c : '',
                'transaction.transactionStatus': (_d = paymentData.transaction_status) !== null && _d !== void 0 ? _d : '',
                'transaction.method': (_e = paymentData.method) !== null && _e !== void 0 ? _e : '',
                'transaction.date_time': (_f = paymentData.date_time) !== null && _f !== void 0 ? _f : '',
                status: paymentData.bank_status === 'Success'
                    ? 'Paid'
                    : paymentData.bank_status === 'Failed'
                        ? 'Pending'
                        : paymentData.bank_status === 'Cancel'
                            ? 'Cancelled'
                            : 'Unknown',
            },
        }, { new: true });
    }
    return verifiedPayment;
});
const getAllOrder = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orderCar = new builder_1.default(order_model_1.default.find().populate('user').populate('products.car'), query)
        // .search(searchBleFild)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield orderCar.countTotal();
    const data = yield orderCar.modelQuery;
    return { meta, data };
});
const getMyOrder = (email, query) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_registration_model_1.UserModel.findOne({ email: email });
    console.log(existUser);
    const orderCar = new builder_1.default(
    // @ts-expect-error existUser
    order_model_1.default.find({ user: existUser._id })
        .populate('user')
        .populate('products.car'), query)
        // .search(searchBleFild)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield orderCar.countTotal();
    const data = yield orderCar.modelQuery;
    return { meta, data };
});
const getOneOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findById(id);
    return result;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.orderServices = {
    createOrder,
    getAllOrder,
    getOneOrder,
    deleteOrder,
    verifyPayment,
    getMyOrder,
};
