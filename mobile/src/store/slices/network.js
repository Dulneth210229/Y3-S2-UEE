import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'network',
  initialState: { isOnline: true },
  reducers: { setOnline(s, a) { s.isOnline = a.payload; } }
});
export const { setOnline } = slice.actions;
export default slice.reducer;
