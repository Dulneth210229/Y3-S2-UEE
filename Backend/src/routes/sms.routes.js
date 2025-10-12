const router = require('express').Router();
const { auth } = require('../middleware/auth');
const c = require('../controllers/sms.controller');

router.post('/send', auth, c.send);

module.exports = router;
