const { distanceKm } = require('./geoService');

function scoreJobForSeeker(job, seeker) {
  let score = 0;

  const seekerSkills = new Set((seeker.profile?.skills || []).map(s => s.toLowerCase()));
  const jobSkills = (job.requiredSkills || []).map(s => s.toLowerCase());
  const matchCount = jobSkills.filter(s => seekerSkills.has(s)).length;
  const skillsScore = Math.min(60, (matchCount / Math.max(jobSkills.length, 1)) * 60);
  score += skillsScore;

  const d = distanceKm(seeker.profile?.location, job.location);
  const proximityScore = d == null ? 0 : Math.max(0, 25 - Math.min(d, 25));
  score += proximityScore;

  const exp = seeker.profile?.experienceYears || 0;
  const expTarget = Math.max(0, Math.round((jobSkills.length || 1) / 2));
  const diff = Math.abs(exp - expTarget);
  const expScore = Math.max(0, 15 - Math.min(diff * 3, 15));
  score += expScore;

  return Math.round(score);
}

function rankJobs(jobs, seeker) {
  return jobs
    .map(j => ({ job: j, score: scoreJobForSeeker(j, seeker) }))
    .sort((a, b) => b.score - a.score);
}

module.exports = { scoreJobForSeeker, rankJobs };
