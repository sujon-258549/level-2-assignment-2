import express from 'express';
import { carController } from './car.controlle';
import zodValidation from '../../utility/zodValidaction';
import carZodSchemaValidation from './car.zod';

// create router
const router = express.Router();

router.post(
  '/',
  zodValidation(carZodSchemaValidation),
  carController.createCar,
);
router.get('/', carController.findAllcarC);
router.get('/:carId', carController.findOneCar);
router.put('/:carId', carController.updateCar);
router.delete('/:carId', carController.deleteCar);

export const carRouter = router;
