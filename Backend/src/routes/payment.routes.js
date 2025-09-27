const express = require('express');
const auth = require('../middleware/auth');
const { createIntent, stripeWebhook, refundPayment, devMarkSucceeded } = require('../controllers/paymentsController');

const router = express.Router();

router.post('/create-intent', auth, createIntent);
router.post('/webhook', stripeWebhook);
router.post('/:paymentId/refund', auth, refundPayment);
router.post('/:paymentId/dev/mark-succeeded', auth, devMarkSucceeded);

module.exports = router;


