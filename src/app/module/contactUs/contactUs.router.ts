import { Router } from 'express';
import { contactController } from './contactUs.controller';
import auth from '../../utility/auth';

const router = Router();
router.post('/create-contact', contactController.createContact);

router.get('/', auth('admin'), contactController.contactForMe);
router.get('/:id', contactController.singleContact);

export const contactRouter = router;
