import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { onlyEmployerOrAdmin } from '../middleware/roles.js';
import validate from '../middleware/validate.js';
import { updateProfileSchema } from '../validation/profileSchemas.js';
import { getMyProfile, updateMyProfile, getSeekerPublic } from '../controller/profile.controller.js';

const router = Router();

router.get('/me', auth, getMyProfile);
router.put('/me', auth, validate(updateProfileSchema), updateMyProfile);
router.get('/public/:id', auth, onlyEmployerOrAdmin, getSeekerPublic);

export default router;
