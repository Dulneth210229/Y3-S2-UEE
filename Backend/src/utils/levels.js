export const EDUCATION_LEVELS = [
  'none',
  'grade6','grade8',
  'ol','al',
  'nvq1','nvq2','nvq3','nvq4','nvq5',
  'certificate','diploma','hnd',
  'degree','masters','mphil','phd'
];

export const levelIndex = (level = 'none') =>
  Math.max(0, EDUCATION_LEVELS.indexOf(level));
