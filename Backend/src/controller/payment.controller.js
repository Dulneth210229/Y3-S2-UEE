const { v4: uuidv4 } = require('uuid');
const Payment = require('../models/Payment');

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured');
  // eslint-disable-next-line global-require
  return require('stripe')(key);
}

function resolvePricingCents(req) {
  // You can enhance pricing logic here (promos, tiered, locale, etc.)
  const configured = parseInt(process.env.JOB_POST_PRICE_CENTS || '100', 10);
  const override = req.body?.amountCents;
  if (override && Number.isFinite(Number(override))) return Number(override);
  return configured;
}

async function createIntent(req, res) {
  try {
    const userId = req.user.id;
    const amountCents = resolvePricingCents(req);
    const currency = (process.env.CURRENCY || 'usd').toLowerCase();
    const stripe = getStripe();

    const idempotencyKey = req.header('Idempotency-Key') || uuidv4();

    const payment = await Payment.create({
      userId,
      amountCents,
      currency,
      status: 'processing'
    });

    const intent = await stripe.paymentIntents.create(
      {
        amount: amountCents,
        currency,
        metadata: { paymentId: payment._id.toString(), userId },
        automatic_payment_methods: { enabled: true }
      },
      { idempotencyKey }
    );

    payment.stripePaymentIntentId = intent.id;
    payment.status = intent.status === 'succeeded' ? 'succeeded' : 'requires_payment_method';
    await payment.save();

    return res.status(201).json({
      clientSecret: intent.client_secret,
      paymentId: payment._id,
      amountCents,
      currency
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('createIntent error', error);
    return res.status(500).json({ error: 'Failed to create payment intent', details: error.message });
  }
}

async function stripeWebhook(req, res) {
  const stripe = getStripe();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    if (!endpointSecret) {
      event = req.body; // insecure for dev only
    } else {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const intent = event.data.object;
        const payment = await Payment.findOne({ stripePaymentIntentId: intent.id });
        if (payment) {
          payment.status = 'succeeded';
          await payment.save();
        }
        break;
      }
      case 'payment_intent.payment_failed': {
        const intent = event.data.object;
        const payment = await Payment.findOne({ stripePaymentIntentId: intent.id });
        if (payment) {
          payment.status = 'failed';
          payment.lastError = intent.last_payment_error?.message || 'payment_failed';
          await payment.save();
        }
        break;
      }
      case 'payment_intent.canceled': {
        const intent = event.data.object;
        const payment = await Payment.findOne({ stripePaymentIntentId: intent.id });
        if (payment) {
          payment.status = 'canceled';
          await payment.save();
        }
        break;
      }
      default:
        break;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Webhook handling error', e);
    return res.status(500).end();
  }

  return res.json({ received: true });
}

async function refundPayment(req, res) {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    if (payment.status !== 'succeeded') {
      return res.status(400).json({ error: 'Only succeeded payments can be refunded' });
    }
    const stripe = getStripe();
    const refund = await stripe.refunds.create({ payment_intent: payment.stripePaymentIntentId });
    return res.json({ refund });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('refundPayment error', e);
    return res.status(500).json({ error: 'Refund failed', details: e.message });
  }
}

async function devMarkSucceeded(req, res) {
  try {
    if (process.env.ENABLE_DEV_PAYMENTS !== 'true') {
      return res.status(403).json({ error: 'Disabled' });
    }
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    payment.status = 'succeeded';
    await payment.save();
    return res.json({ ok: true, payment });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('devMarkSucceeded error', e);
    return res.status(500).json({ error: 'Failed', details: e.message });
  }
}

module.exports = { createIntent, stripeWebhook, refundPayment, devMarkSucceeded };


