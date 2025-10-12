const { deriveBadges } = require('../services/badgeService');

test('derive badges from skills and experience', () => {
  const user = { profile: { skills: ['carpentry'], experienceYears: 6, educationLevel: 'NVQ' }, endorsements: [{ skill: 'carpentry' }] };
  const badges = deriveBadges(user);
  expect(badges.some(b => b.name === 'Experienced')).toBeTruthy();
  expect(badges.some(b => b.name === 'Certified')).toBeTruthy();
});
