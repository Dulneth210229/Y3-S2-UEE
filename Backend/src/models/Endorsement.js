const mongoose = require('mongoose');

const EndorsementSchema = new mongoose.Schema({
  poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seeker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skill: String,
  comment: String
}, { timestamps: true });

EndorsementSchema.index({ poster: 1, seeker: 1, skill: 1 }, { unique: true });
module.exports = mongoose.model('Endorsement', EndorsementSchema);
