import User from '../model/User.js';
import { levelIndex } from './levels.js';

function educationPoints(level) {
  const idx = levelIndex(level);
  if (idx <= levelIndex('ol')) return 5;
  if (idx <= levelIndex('al')) return 10;
  if (idx <= levelIndex('nvq5')) return 14;
  if (idx <= levelIndex('diploma')) return 16;
  if (idx <= levelIndex('degree')) return 20;
  if (idx <= levelIndex('masters')) return 24;
  if (idx <= levelIndex('phd')) return 30;
  return 0;
}

export async function recomputeTrust(userId) {
  const u = await User.findById(userId);
  if (!u) return 0;

  const eduPts = educationPoints(u.educationLevel || 'none');
  const verifiedCount = (u.educations || []).filter(e => e.verified).length;
  const eduVerifiedBonus = Math.min(9, verifiedCount * 3);

  const trust = Math.min(100, eduPts + eduVerifiedBonus);
  await User.findByIdAndUpdate(userId, { trustScore: trust });
  return trust;
}
