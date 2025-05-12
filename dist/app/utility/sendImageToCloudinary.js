"use strict";
// import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
// import config from '../config';
// import multer from 'multer';
// import fs from 'fs';
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
exports.sendImageToCloudinary = exports.upload = void 0;
// cloudinary.config({
//   cloud_name: config.cloudinary.cloudinary_cloud_name,
//   api_key: config.cloudinary.cloudinary_api_key,
//   api_secret: config.cloudinary.cloudinary_api_secret,
// });
// export const sendImageToCloudinary = async (
//   imageName: string,
//   path: string,
// ): Promise<Record<string, unknown>> => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       path,
//       {
//         public_id: imageName.trim(),
//       },
//       function (error, result) {
//         if (error) {
//           reject(error);
//         }
//         resolve(result as UploadApiResponse);
//         fs.unlink(path, (err) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log('file is deleted');
//           }
//         });
//       },
//     );
//   });
// };
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, process.cwd() + '/uploads');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//   },
// });
// export const upload = multer({ storage: storage });
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../config"));
const multer_1 = __importDefault(require("multer"));
const streamifier_1 = __importDefault(require("streamifier")); // Needed for buffer to stream
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary.cloudinary_api_key,
    api_secret: config_1.default.cloudinary.cloudinary_api_secret,
});
// Use memory storage instead of disk
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
// Upload buffer directly to Cloudinary
const sendImageToCloudinary = (imageName, buffer) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            public_id: imageName.trim(),
        }, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
        streamifier_1.default.createReadStream(buffer).pipe(stream);
    });
});
exports.sendImageToCloudinary = sendImageToCloudinary;
