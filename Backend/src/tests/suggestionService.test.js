const { scoreJobForSeeker } = require('../services/suggestionService');

test('score prefers skill match', () => {
  const job = { requiredSkills: ['carpentry'], location: { lat: 7, lng: 80 } };
  const seeker = { profile: { skills: ['carpentry'], experienceYears: 2, location: { lat: 7.1, lng: 80.1 } } };
  const s = scoreJobForSeeker(job, seeker);
  expect(s).toBeGreaterThan(30);
});
