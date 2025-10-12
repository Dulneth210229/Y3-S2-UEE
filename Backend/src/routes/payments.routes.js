const router = require('express').Router();
const { auth } = require('../middleware/auth');
const validate = require('../middleware/validate');
const v = require('../validations/payment.validation');
const c = require('../controllers/payments.controller');

router.post('/job-post/create-session', auth, validate(v.createJobPostSession), c.createJobPostSession);
router.post('/webhook', c.webhook);

module.exports = router;
