const Job = require('../models/Job');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Application = require('../models/Application');

exports.pendingJobs = async (req, res) => {
  const jobs = await Job.find({ status: 'pending_approval' }).populate('poster');
  res.json({ success: true, data: jobs });
};

exports.approveJob = async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) return next(Object.assign(new Error('Not found'), { status: 404 }));
  job.status = 'approved';
  await job.save();
  res.json({ success: true, data: job });
};

exports.rejectJob = async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) return next(Object.assign(new Error('Not found'), { status: 404 }));
  job.status = 'rejected';
  await job.save();
  res.json({ success: true, data: job });
};

exports.metrics = async (req, res) => {
  const jobs = await Job.countDocuments({ status: 'approved' });
  const applications = await Application.countDocuments({});
  const conversations = await Conversation.countDocuments({});
  const revenue = await Payment.aggregate([{ $match: { status: 'paid' } }, { $group: { _id: null, sum: { $sum: '$amount' } } }]);
  const topCategories = await Job.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 5 }]);
  res.json({ success: true, data: { jobs, applications, conversations, revenueCents: revenue[0]?.sum || 0, topCategories } });
};

exports.manageUser = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return next(Object.assign(new Error('Not found'), { status: 404 }));
  res.json({ success: true, data: user });
};
