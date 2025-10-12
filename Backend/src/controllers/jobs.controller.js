const Job = require('../models/Job');
const { getPagination } = require('../utils/pagination');

exports.create = async (req, res, next) => {
  try {
    const job = await Job.create({ ...req.body, poster: req.user._id, status: 'draft' });
    res.json({ success: true, data: job });
  } catch (e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    const { skip, limit, page } = getPagination(req);
    const query = {};
    if (req.user?.role !== 'Admin') query.status = 'approved';
    if (req.query.category) query.category = req.query.category;
    if (req.query.language) query.language = req.query.language;
    const jobs = await Job.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Job.countDocuments(query);
    res.json({ success: true, data: { jobs, page, total } });
  } catch (e) { next(e); }
};

exports.getOne = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return next(Object.assign(new Error('Not found'), { status: 404 }));
    if (job.status !== 'approved' && req.user.role !== 'Admin' && job.poster.toString() !== req.user._id.toString()) {
      return next(Object.assign(new Error('Forbidden'), { status: 403 }));
    }
    res.json({ success: true, data: job });
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return next(Object.assign(new Error('Not found'), { status: 404 }));
    if (job.poster.toString() !== req.user._id.toString()) return next(Object.assign(new Error('Forbidden'), { status: 403 }));
    Object.assign(job, req.body);
    await job.save();
    res.json({ success: true, data: job });
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return next(Object.assign(new Error('Not found'), { status: 404 }));
    if (req.user.role !== 'Admin' && job.poster.toString() !== req.user._id.toString()) return next(Object.assign(new Error('Forbidden'), { status: 403 }));
    await job.deleteOne();
    res.json({ success: true });
  } catch (e) { next(e); }
};
