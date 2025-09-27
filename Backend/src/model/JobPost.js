const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    createdBy: { type: String, required: true },
    priceCents: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('JobPost', jobPostSchema);


