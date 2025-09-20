import User from '../model/User.js';

export async function getMyProfile(req, res) {
  const me = await User.findById(req.user.id).populate('badges');
  res.json(me);
}

export async function updateMyProfile(req, res) {
  const { location, bio, skills, profilePublic } = req.body;
  const me = await User.findByIdAndUpdate(
    req.user.id,
    { location, bio, skills, profilePublic },
    { new: true }
  ).populate('badges');
  res.json(me);
}

// employer/admin protected
export async function getSeekerPublic(req, res) {
  const user = await User.findById(req.params.id)
    .select('-passwordHash -email')
    .populate('badges');

  if (!user || user.role !== 'job_seeker') return res.status(404).json({ message: 'Not found' });
  if (user.profilePublic !== true) return res.status(403).json({ message: 'Profile not public' });

  res.json(user);
}
