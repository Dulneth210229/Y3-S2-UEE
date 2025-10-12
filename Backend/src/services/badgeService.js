function deriveBadges(user) {
  const skills = (user.profile?.skills || []).map(s => s.toLowerCase());
  const badges = new Map();

  const add = (name, amt) => badges.set(name, Math.min(100, (badges.get(name) || 0) + amt));

  skills.forEach(s => add(capitalize(s), 40));

  const years = user.profile?.experienceYears || 0;
  if (years >= 5) add('Experienced', 30);
  if (years >= 10) add('Veteran', 40);

  const edu = (user.profile?.educationLevel || '').toLowerCase();
  if (edu.includes('nvq') || edu.includes('diploma')) add('Certified', 20);
  if (edu.includes('degree')) add('Graduate', 30);

  (user.endorsements || []).forEach(e => {
    if (e.skill) add(capitalize(e.skill), 5);
  });

  return Array.from(badges).map(([name, confidence]) => ({ name, confidence }));
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

module.exports = { deriveBadges };
