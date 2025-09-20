import { Router } from 'express';
import validate from '../middleware/validate.js';
import { signupSchema, loginSchema } from '../validation/authSchemas.js';
import { signup, login, me } from '../controller/auth.controller.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.get('/me', auth, me);

export default router;
