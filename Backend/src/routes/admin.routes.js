const router = require('express').Router();
const { auth, requireRole } = require('../middleware/auth');
const c = require('../controllers/admin.controller');

router.get('/jobs', auth, requireRole('Admin'), c.pendingJobs);
router.patch('/jobs/:id/approve', auth, requireRole('Admin'), c.approveJob);
router.patch('/jobs/:id/reject', auth, requireRole('Admin'), c.rejectJob);
router.get('/metrics', auth, requireRole('Admin'), c.metrics);
router.patch('/users/:id', auth, requireRole('Admin'), c.manageUser);

module.exports = router;
