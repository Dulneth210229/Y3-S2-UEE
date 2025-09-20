import { Router } from 'express';
import validate from '../middleware/validate.js';
import { searchSeekersQuery } from '../validation/searchSchemas.js';
import { searchSeekers } from '../controller/search.controller.js';

const router = Router();

router.get('/seekers', validate(searchSeekersQuery, 'query'), searchSeekers);

export default router;
