const router = require('express').Router();
const validate = require('../middleware/validate');
const { auth } = require('../middleware/auth');
const v = require('../validations/auth.validation');
const c = require('../controllers/auth.controller');

router.post('/register', validate(v.register), c.register);
router.post('/login', validate(v.login), c.login);
router.post('/refresh', validate(v.refresh), c.refresh);
router.post('/logout', auth, c.logout);

module.exports = router;
