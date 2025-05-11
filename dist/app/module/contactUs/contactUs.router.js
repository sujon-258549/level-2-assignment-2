"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const express_1 = require("express");
const contactUs_controller_1 = require("./contactUs.controller");
const auth_1 = __importDefault(require("../../utility/auth"));
const router = (0, express_1.Router)();
router.post('/create-contact', contactUs_controller_1.contactController.createContact);
router.get('/', (0, auth_1.default)('admin'), contactUs_controller_1.contactController.contactForMe);
router.get('/:id', contactUs_controller_1.contactController.singleContact);
exports.contactRouter = router;
