const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['job_post'], required: true },
  amount: Number,
  currency: String,
  stripeSessionId: String,
  status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
