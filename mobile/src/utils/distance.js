export const distanceKm = (a, b) => {
  if (!a || !b) return null;
  const R = 6371, dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng);
  const x = Math.sin(dLat/2)**2 + Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*(Math.sin(dLng/2)**2);
  return 2*R*Math.asin(Math.sqrt(x));
};
const toRad = (d) => d*Math.PI/180;
