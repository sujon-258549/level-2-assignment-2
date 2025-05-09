"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./app/router"));
const globalErrorHandler_1 = __importDefault(require("./app/Error/globalErrorHandler"));
const notfound_1 = __importDefault(require("./app/Notfound/notfound"));
const app = (0, express_1.default)();
// const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['https://car-shop-one-indol.vercel.app', 'http://localhost:5173'],
}));
// app.use(cors());
app.use('/api', router_1.default);
app.get('/', (req, res) => {
    res.send('Assign meat Service on ');
});
app.use(globalErrorHandler_1.default);
app.use(notfound_1.default);
exports.default = app;
