import { Router } from 'express';
import multer from 'multer';
import { certificateStorage } from '../config/cloudinary.js';
import { auth } from '../middleware/auth.js';
import { uploadEducationCertificate } from '../controller/upload.controller.js';

const router = Router();
const upload = multer({ storage: certificateStorage });

router.post('/education-certificate', auth, upload.single('file'), uploadEducationCertificate);

export default router;
