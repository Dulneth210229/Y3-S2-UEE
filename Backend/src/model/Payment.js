const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    provider: { type: String, default: 'stripe' },
    amountCents: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    status: { type: String, enum: ['requires_payment_method', 'processing', 'succeeded', 'failed', 'canceled'], default: 'requires_payment_method', index: true },
    stripePaymentIntentId: { type: String, index: true },
    lastError: { type: String },
    metadata: { type: Object }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);


