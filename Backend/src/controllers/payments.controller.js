const { stripe, JOB_POST_PRICE_CENTS, CURRENCY } = require('../config/stripe');
const Job = require('../models/Job');
const Payment = require('../models/Payment');

exports.createJobPostSession = async (req, res, next) => {
  try {
    const job = await Job.findById(req.body.jobId);
    if (!job || job.poster.toString() !== req.user._id.toString()) return next(Object.assign(new Error('Invalid job'), { status: 400 }));
    const payment = await Payment.create({ user: req.user._id, type: 'job_post', amount: JOB_POST_PRICE_CENTS, currency: CURRENCY, status: 'created' });
    job.payment = payment._id;
    await job.save();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: CURRENCY, product_data: { name: 'Job Post Credit' }, unit_amount: JOB_POST_PRICE_CENTS }, quantity: 1 }],
      success_url: `${process.env.CLIENT_URL}/?payment=success`,
      cancel_url: `${process.env.CLIENT_URL}/?payment=cancel`,
      metadata: { paymentId: payment._id.toString(), jobId: job._id.toString() }
    });

    payment.stripeSessionId = session.id;
    await payment.save();

    res.json({ success: true, data: { url: session.url } });
  } catch (e) { next(e); }
};

exports.webhook = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const paymentId = session.metadata?.paymentId;
    const jobId = session.metadata?.jobId;
    if (paymentId) await Payment.findByIdAndUpdate(paymentId, { status: 'paid' });
    if (jobId) await Job.findByIdAndUpdate(jobId, { status: 'pending_approval' });
  }
  res.json({ received: true });
};
