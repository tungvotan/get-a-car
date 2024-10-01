import { Router } from 'express';
import { handleFormSubmit } from '../controllers/formController';

const router = Router();

router.post('/', handleFormSubmit);

export default router;
