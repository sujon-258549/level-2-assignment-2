import { NextFunction, Request, Response, Router } from 'express';
import { userRegistrationController } from './user.registration.controlle';
import zodValidation from '../../utility/zodValidaction';
import loginZodValidation from './user.zod.Validaction';
import auth, { userRole } from '../../utility/auth';
import { upload } from '../../utility/sendImageToCloudinary';

const router = Router();

router.post(
  '/registered',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
    req.body = JSON.parse(req.body.data);
    next();
  },
  userRegistrationController.createUser,
);
router.post(
  '/change-password',
  //   auth(userRole.admin, userRole.user),
  userRegistrationController.changePassword,
);
router.get('/', auth(userRole.admin), userRegistrationController.findAllUser);
router.get(
  '/me',
  auth(userRole.user, userRole.admin),
  userRegistrationController.getMe,
);
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
router.put(
  '/',
  auth(userRole.admin, userRole.user),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
    req.body = JSON.parse(req.body.data);
    next();
  },
  userRegistrationController.updateUser,
);
export const userRegistrationRouter = router;
