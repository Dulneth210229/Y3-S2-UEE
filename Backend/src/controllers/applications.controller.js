const Application = require('../models/Application');
const Job = require('../models/Job');

exports.apply = async (req, res, next) => {
  try {
    const job = await Job.findById(req.body.jobId);
    if (!job || job.status !== 'approved') return next(Object.assign(new Error('Job not available'), { status: 400 }));
    const app = await Application.create({ job: job._id, seeker: req.user._id });
    res.json({ success: true, data: app });
  } catch (e) { if (e.code === 11000) return next(Object.assign(new Error('Already applied'), { status: 409 })); next(e); }
};

exports.mine = async (req, res, next) => {
  const list = await Application.find({ seeker: req.user._id }).populate('job');
  res.json({ success: true, data: list });
};

exports.byJob = async (req, res, next) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) return next(Object.assign(new Error('Not found'), { status: 404 }));
  if (job.poster.toString() !== req.user._id.toString()) return next(Object.assign(new Error('Forbidden'), { status: 403 }));
  const list = await Application.find({ job: req.params.jobId }).populate('seeker');
  res.json({ success: true, data: list });
};

exports.update = async (req, res, next) => {
  const app = await Application.findById(req.params.id).populate('job');
  if (!app) return next(Object.assign(new Error('Not found'), { status: 404 }));
  if (app.job.poster.toString() !== req.user._id.toString()) return next(Object.assign(new Error('Forbidden'), { status: 403 }));
  app.status = req.body.status;
  await app.save();
  res.json({ success: true, data: app });
};
