const router = require('express').Router();
const { auth } = require('../middleware/auth');
const validate = require('../middleware/validate');
const v = require('../validations/user.validation');
const c = require('../controllers/users.controller');

router.get('/me', auth, c.getMe);
router.put('/me', auth, validate(v.profile), c.updateMe);
router.post('/me/photo', auth, (req, res, next) => {
  if (!req.body.url) return next(Object.assign(new Error('Missing url'), { status: 400 }));
  next();
}, c.updatePhoto);

module.exports = router;
