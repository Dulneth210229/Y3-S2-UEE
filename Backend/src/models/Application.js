const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  seeker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['applied', 'shortlisted', 'hired', 'rejected'], default: 'applied' }
}, { timestamps: true });

ApplicationSchema.index({ job: 1, seeker: 1 }, { unique: true });
module.exports = mongoose.model('Application', ApplicationSchema);
