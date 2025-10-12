const router = require('express').Router();
const { auth } = require('../middleware/auth');
const c = require('../controllers/conversations.controller');

router.post('/', auth, c.create);
router.get('/', auth, c.list);

module.exports = router;
