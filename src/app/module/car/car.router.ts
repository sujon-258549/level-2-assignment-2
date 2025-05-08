import express, { NextFunction, Request, Response } from 'express';
import { carController } from './car.controlle';
import auth from '../../utility/auth';
import { upload } from '../../utility/sendImageToCloudinary';

// create router
const router = express.Router();

router.post(
  '/',
  auth('admin'),
  upload.fields([{ name: 'images' }]),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.data, req.files);
    req.body = JSON.parse(req.body.data);
    next();
  },
  carController.createCar,
);
router.get('/', carController.findAllcarC);
router.get('/:carId', carController.findOneCar);
router.put(
  '/:carId',
  auth('admin'),
  upload.fields([{ name: 'images' }]),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  carController.updateCar,
);
router.delete('/:carId', auth('admin'), carController.deleteCar);

export const carRouter = router;
