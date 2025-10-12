const router = require('express').Router();
const { auth, requireRole } = require('../middleware/auth');
const validate = require('../middleware/validate');
const v = require('../validations/application.validation');
const c = require('../controllers/applications.controller');

router.post('/', auth, requireRole('JobSeeker'), validate(v.create), c.apply);
router.get('/mine', auth, requireRole('JobSeeker'), c.mine);
router.get('/by-job/:jobId', auth, requireRole('JobPoster'), c.byJob);
router.patch('/:id', auth, requireRole('JobPoster'), validate(v.update), c.update);

module.exports = router;
