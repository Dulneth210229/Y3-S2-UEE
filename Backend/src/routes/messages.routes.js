const router = require('express').Router();
const { auth } = require('../middleware/auth');
const validate = require('../middleware/validate');
const v = require('../validations/message.validation');
const c = require('../controllers/messages.controller');

router.get('/:conversationId', auth, c.list);
router.post('/:conversationId', auth, validate(v.create), c.create);

module.exports = router;
