const Payment = require('../models/Payment');
const JobPost = require('../models/JobPost');

async function createJob(req, res) {
  try {
    const userId = req.user.id;
    const { title, description, location, paymentId } = req.body;
    if (!paymentId) return res.status(400).json({ error: 'paymentId required' });

    const payment = await Payment.findOne({ _id: paymentId, userId });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    if (payment.status !== 'succeeded') {
      return res.status(402).json({ error: 'Payment not completed' });
    }

    const job = await JobPost.create({
      title,
      description,
      location,
      createdBy: userId,
      priceCents: payment.amountCents,
      currency: payment.currency,
      paymentId: payment._id
    });

    return res.status(201).json({ job });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('createJob error', e);
    return res.status(500).json({ error: 'Failed to create job', details: e.message });
  }
}

module.exports = { createJob };


