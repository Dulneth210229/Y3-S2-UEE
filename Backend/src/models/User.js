const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ProfileSchema = new mongoose.Schema({
  name: String,
  photo: String,
  locationName: String,
  location: { lat: Number, lng: Number },
  educationLevel: String,
  experienceYears: { type: Number, default: 0 },
  skills: [{ type: String }],
  preferredJobTypes: [{ type: String }],
  languages: [{ type: String }],
  // Poster extras
  posterType: { type: String, enum: ['individual', 'company'], default: 'individual' },
  companyName: String,
  contactPhone: String,
  verified: { type: Boolean, default: false }
}, { _id: false });

const BadgeSchema = new mongoose.Schema({
  name: String,
  confidence: { type: Number, default: 0 }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'JobSeeker', 'JobPoster'], default: 'JobSeeker' },
  active: { type: Boolean, default: true },
  profile: ProfileSchema,
  badges: [BadgeSchema],
  endorsements: [{
    poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    skill: String,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  refreshTokens: [{ token: String, createdAt: { type: Date, default: Date.now } }],
  phone: String
}, { timestamps: true });

UserSchema.methods.setPassword = async function (pwd) {
  this.passwordHash = await bcrypt.hash(pwd, 10);
};
UserSchema.methods.validatePassword = function (pwd) {
  return bcrypt.compare(pwd, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);
