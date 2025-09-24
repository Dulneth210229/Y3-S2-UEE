import client from './client';
export const searchSeekers = (params) => client.get('/search/seekers', { params });
