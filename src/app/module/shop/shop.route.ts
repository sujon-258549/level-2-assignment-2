import { NextFunction, Request, Response, Router } from 'express';
import auth from '../../utility/auth';
import { upload } from '../../utility/sendImageToCloudinary';
import { ShopControllers } from './shop.controller';

const router = Router();

router.post(
  '/create-shop',
  auth('admin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ShopControllers.createShop,
);

router.get('/my-shop', auth('admin'), ShopControllers.getMyShop);
router.put(
  '/update-shop',
  auth('admin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ShopControllers.updateShop,
);

export const shopRouters = router;
