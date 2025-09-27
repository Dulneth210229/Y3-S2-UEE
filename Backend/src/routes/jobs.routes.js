const express = require('express');
const auth = require('../middleware/auth');
const { createJob } = require('../controllers/jobsController');

const router = express.Router();

router.post('/', auth, createJob);

module.exports = router;


