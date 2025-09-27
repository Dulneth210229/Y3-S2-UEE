import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { onlyAdmin } from '../middleware/roles.js';
import validate from '../middleware/validate.js';
import { addEducationSchema, setHighestSchema } from '../validation/educationSchemas.js';
import { addEducation, listMyEducation, setHighestLevel, adminVerifyEducation } from '../controller/education.controller.js';

const router = Router();

router.post('/me/add', auth, validate(addEducationSchema), addEducation);
router.get('/me', auth, listMyEducation);
router.put('/me/highest', auth, validate(setHighestSchema), setHighestLevel);
router.patch('/verify/:userId/:index', auth, onlyAdmin, adminVerifyEducation);

export default router;
