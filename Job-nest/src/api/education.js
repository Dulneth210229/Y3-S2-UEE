import client from './client';
export const addEducation = (payload) => client.post('/education/me/add', payload);
export const listMyEducation = () => client.get('/education/me');
export const setHighestEducation = (level) => client.put('/education/me/highest', { level });
