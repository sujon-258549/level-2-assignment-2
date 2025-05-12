// import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
// import config from '../config';
// import multer from 'multer';
// import fs from 'fs';

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

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import streamifier from 'streamifier'; // Needed for buffer to stream

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_cloud_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// Use memory storage instead of disk
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Upload buffer directly to Cloudinary
export const sendImageToCloudinary = async (
  imageName: string,
  buffer: Buffer,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: imageName.trim(),
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result as UploadApiResponse);
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
