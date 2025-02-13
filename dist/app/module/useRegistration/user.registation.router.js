"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegistrationRouter = void 0;
const express_1 = require("express");
const user_registration_controlle_1 = require("./user.registration.controlle");
const zodValidaction_1 = __importDefault(require("../../utility/zodValidaction"));
const user_zod_Validaction_1 = __importDefault(require("./user.zod.Validaction"));
const auth_1 = __importStar(require("../../utility/auth"));
const router = (0, express_1.Router)();
router.post('/registered', user_registration_controlle_1.userRegistrationController.createUser);
router.post('/change-password', 
//   auth(userRole.admin, userRole.user),
user_registration_controlle_1.userRegistrationController.changePassword);
router.get('/', (0, auth_1.default)(auth_1.userRole.admin), user_registration_controlle_1.userRegistrationController.findAllUser);
router.get('/:id', 
//   auth(userRole.admin, userRole.user),
user_registration_controlle_1.userRegistrationController.findOneUser);
router.post('/login', (0, zodValidaction_1.default)(user_zod_Validaction_1.default), user_registration_controlle_1.userRegistrationController.loginUser);
exports.userRegistrationRouter = router;
