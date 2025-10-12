import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export const applyJob = createAsyncThunk('apps/apply', async (jobId) => {
  const res = await api.post('/applications', { jobId });
  return res.data.data;
});

const slice = createSlice({
  name: 'applications',
  initialState: { mine: [] },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(applyJob.fulfilled, (s, a) => { s.mine.push(a.payload); });
  }
});
export default slice.reducer;
