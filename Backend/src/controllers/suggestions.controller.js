const Job = require('../models/Job');
const { rankJobs } = require('../services/suggestionService');

exports.feed = async (req, res, next) => {
  try {
    if (req.user.role !== 'JobSeeker') return next(Object.assign(new Error('Forbidden'), { status: 403 }));
    const jobs = await Job.find({ status: 'approved' });
    const ranked = rankJobs(jobs, req.user).slice(0, 50);
    res.json({ success: true, data: ranked });
  } catch (e) { next(e); }
};
