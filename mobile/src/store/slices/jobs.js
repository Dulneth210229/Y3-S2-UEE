import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export const fetchJobs = createAsyncThunk('jobs/fetch', async (params) => {
  const res = await api.get('/jobs', { params });
  return res.data.data.jobs;
});

const slice = createSlice({
  name: 'jobs',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchJobs.pending, (s) => { s.status = 'loading'; });
    b.addCase(fetchJobs.fulfilled, (s, a) => { s.status = 'succeeded'; s.list = a.payload; });
    b.addCase(fetchJobs.rejected, (s) => { s.status = 'failed'; });
  }
});
export default slice.reducer;
