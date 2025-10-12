const router = require('express').Router();
const { auth } = require('../middleware/auth');
const c = require('../controllers/suggestions.controller');

router.get('/', auth, c.feed);

module.exports = router;
