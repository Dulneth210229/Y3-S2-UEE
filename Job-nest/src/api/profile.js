import client from './client';
export const getMyProfile = () => client.get('/profile/me');
export const updateMyProfile = (payload) => client.put('/profile/me', payload);
export const getSeekerPublic = (id) => client.get(`/profile/public/${id}`);
