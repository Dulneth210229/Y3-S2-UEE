import User from '../model/User.js';
import { levelIndex } from '../utils/levels.js';

export async function searchSeekers(req, res) {
  const { minEducation, skill, minTrust, page, limit, sort } = req.query;

  const minRank = levelIndex(minEducation);
  const filter = {
    role: 'job_seeker',
    eduRank: { $gte: minRank },
    trustScore: { $gte: Number(minTrust) },
    profilePublic: true
  };
  if (skill && skill.trim()) filter.skills = skill.trim();

  let sortObj = { trustScore: -1, updatedAt: -1 };
  if (sort === 'trust') sortObj = { trustScore: 1 };
  if (sort === '-trust') sortObj = { trustScore: -1 };
  if (sort === 'recent') sortObj = { updatedAt: 1 };
  if (sort === '-recent') sortObj = { updatedAt: -1 };

  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    User.find(filter)
      .select('-passwordHash -email')
      .populate('badges')
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit)),
    User.countDocuments(filter)
  ]);

  res.json({ total, page: Number(page), pageSize: Number(limit), results: items });
}
