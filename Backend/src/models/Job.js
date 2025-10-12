const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['draft', 'pending_approval', 'approved', 'rejected'], default: 'draft', index: true },
  title: { type: String, required: true },
  description: String,
  category: String,
  requiredSkills: [{ type: String }],
  payMin: Number,
  payMax: Number,
  locationName: String,
  location: { lat: Number, lng: Number },
  employmentType: String,
  language: String,
  contact: String,
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
