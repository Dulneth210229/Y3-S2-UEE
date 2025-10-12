export const parseVoiceQuery = (text) => {
  const t = (text || '').toLowerCase();
  const category = ['farming','carpentry','driver','tailor','construction'].find(c => t.includes(c)) || '';
  const nearMe = t.includes('near me');
  return { category, nearMe };
};
