require('dotenv').config();
const { connectDB } = require('../config/db');
const User = require('../models/User');
const Job = require('../models/Job');

(async () => {
  await connectDB();
  await Promise.all([User.deleteMany({}), Job.deleteMany({})]);

  const admin = new User({ email: 'admin@example.com', role: 'Admin' });
  await admin.setPassword('password');
  await admin.save();

  const poster = new User({
    email: 'poster@example.com',
    role: 'JobPoster',
    profile: { name: 'Poster Co', posterType: 'company', companyName: 'AgriWorks', contactPhone: '0712345678', verified: true }
  });
  await poster.setPassword('password'); await poster.save();

  const seeker = new User({
    email: 'seeker@example.com',
    role: 'JobSeeker',
    profile: { name: 'Asha', locationName: 'Kegalle', location: { lat: 7.2506, lng: 80.3464 }, skills: ['farming', 'carpentry'], experienceYears: 3 }
  });
  await seeker.setPassword('password'); await seeker.save();

  const job = await Job.create({
    poster: poster._id, status: 'approved',
    title: 'Tea Plucking Assistant', description: 'Morning shift',
    category: 'Farming', requiredSkills: ['farming'], payMin: 1000, payMax: 1500,
    locationName: 'Gampola', location: { lat: 7.1645, lng: 80.5696 }, employmentType: 'Part-time', language: 'si'
  });

  console.log('Seeded:', { admin: admin.email, poster: poster.email, seeker: seeker.email, job: job.title });
  process.exit(0);
})();
