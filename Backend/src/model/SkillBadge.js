import mongoose from 'mongoose';

const skillBadgeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  skillKey: { type: String, index: true },   // e.g. 'education'
  level: { type: Number, enum: [1,2,3], default: 1 },
  source: { type: String, enum: ['assessment','endorsement','admin','education'], default: 'education' },
  issuedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const SkillBadge = mongoose.model('SkillBadge', skillBadgeSchema);
export default SkillBadge;
