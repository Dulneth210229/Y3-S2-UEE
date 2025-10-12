const router = require('express').Router();
const { auth, requireRole } = require('../middleware/auth');
const validate = require('../middleware/validate');
const v = require('../validations/job.validation');
const c = require('../controllers/jobs.controller');

router.post('/', auth, requireRole('JobPoster', 'Admin'), validate(v.create), c.create);
router.get('/', auth, c.list);
router.get('/:id', auth, c.getOne);
router.put('/:id', auth, requireRole('JobPoster', 'Admin'), validate(v.update), c.update);
router.delete('/:id', auth, requireRole('JobPoster', 'Admin'), c.remove);

module.exports = router;
