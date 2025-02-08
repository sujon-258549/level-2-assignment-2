import { Router } from 'express';
import { userRegistrationController } from './user.registration.controlle';
import zodValidation from '../../utility/zodValidaction';
import loginZodValidation from './user.zod.Validaction';
import auth, { userRole } from '../../utility/auth';

const router = Router();

router.post('/registered', userRegistrationController.createUser);
router.get('/', auth(userRole.admin), userRegistrationController.findAllUser);
router.get(
  '/:id',
  auth(userRole.admin, userRole.user),
  userRegistrationController.findOneUser,
);

router.post(
  '/login',
  zodValidation(loginZodValidation),
  userRegistrationController.loginUser,
);

export const userRegistrationRouter = router;
