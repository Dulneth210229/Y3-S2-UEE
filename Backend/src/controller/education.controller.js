import User from '../model/User.js';
import SkillBadge from '../model/SkillBadge.js';
import { levelIndex } from '../utils/levels.js';
import { recomputeTrust } from '../utils/trustScore.js';

function educationLevelToBadgeLevel(level) {
  const idx = levelIndex(level);
  if (idx >= levelIndex('masters')) return 3;                 // Gold
  if (idx >= levelIndex('hnd') && idx <= levelIndex('degree')) return 2; // Silver
  if (idx >= levelIndex('ol')) return 1;                      // Bronze
  return 0;
}

async function ensureEducationBadge(user) {
  const badgeLevel = educationLevelToBadgeLevel(user.educationLevel || 'none');
  if (badgeLevel <= 0) return null;
  const badge = await SkillBadge.findOneAndUpdate(
    { user: user._id, skillKey: 'education' },
    { $set: { level: badgeLevel, source: 'education', issuedAt: new Date() } },
    { new: true, upsert: true }
  );
  await User.findByIdAndUpdate(user._id, { $addToSet: { badges: badge._id } });
  return badge;
}

export async function addEducation(req, res) {
  const { level, field, institution, year, certificateUrl } = req.body;
  const u = await User.findById(req.user.id);
  u.educations.push({ level, field, institution, year, certificateUrl, verified: false });

  if (levelIndex(level) > levelIndex(u.educationLevel || 'none')) {
    u.educationLevel = level;
    u.eduRank = levelIndex(level);
  }

  await u.save();
  await ensureEducationBadge(u);
  await recomputeTrust(u._id);

  res.status(201).json({ educationLevel: u.educationLevel, educations: u.educations, trustScore: u.trustScore });
}

export async function listMyEducation(req, res) {
  const u = await User.findById(req.user.id).select('educationLevel eduRank educations trustScore').populate('badges');
  res.json(u);
}

export async function setHighestLevel(req, res) {
  const { level } = req.body;
  const u = await User.findById(req.user.id);
  u.educationLevel = level;
  u.eduRank = levelIndex(level);
  await u.save();
  await ensureEducationBadge(u);
  await recomputeTrust(u._id);
  res.json({ educationLevel: u.educationLevel, eduRank: u.eduRank });
}

export async function adminVerifyEducation(req, res) {
  const { userId, index } = req.params;
  const idx = parseInt(index, 10);
  const u = await User.findById(userId);
  if (!u) return res.status(404).json({ message: 'User not found' });
  if (Number.isNaN(idx) || !u.educations[idx]) {
    return res.status(400).json({ message: 'Invalid index' });
  }
  u.educations[idx].verified = true;
  const eLevel = u.educations[idx].level || 'none';
  if (levelIndex(eLevel) > levelIndex(u.educationLevel || 'none')) {
    u.educationLevel = eLevel;
    u.eduRank = levelIndex(eLevel);
  }
  await u.save();
  await ensureEducationBadge(u);
  await recomputeTrust(u._id);
  res.json({ ok: true, education: u.educations[idx], educationLevel: u.educationLevel, eduRank: u.eduRank });
}
