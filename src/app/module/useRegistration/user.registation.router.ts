import { Router } from 'express';
import { userRegistrationController } from './user.registration.controlle';
import zodValidation from '../../utility/zodValidaction';
import loginZodValidation from './user.zod.Validaction';

const router = Router();

router.post('/registered', userRegistrationController.createUser);
router.post(
  '/login',
  zodValidation(loginZodValidation),
  userRegistrationController.loginUser,
);

export const userRegistrationRouter = router;
