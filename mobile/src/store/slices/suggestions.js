import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export const fetchSuggestions = createAsyncThunk('sug/fetch', async () => {
  const res = await api.get('/suggestions');
  return res.data.data || [];
});

const slice = createSlice({
  name: 'suggestions',
  initialState: { list: [] },
  reducers: {},
  extraReducers: (b) => b.addCase(fetchSuggestions.fulfilled, (s, a) => { s.list = a.payload; })
});
export default slice.reducer;
