import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export const login = createAsyncThunk('auth/login', async (payload) => {
  const res = await api.post('/auth/login', payload);
  return res.data.data;
});
export const signup = createAsyncThunk('auth/signup', async (payload) => {
  const res = await api.post('/auth/register', payload);
  return res.data.data;
});
export const refresh = createAsyncThunk('auth/refresh', async (refreshToken) => {
  const res = await api.post('/auth/refresh', { refreshToken });
  return res.data.data;
});

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, tokens: null },
  reducers: { logoutLocal(state) { state.user = null; state.tokens = null; } },
  extraReducers: (b) => {
    b.addCase(login.fulfilled, (s, a) => Object.assign(s, a.payload));
    b.addCase(signup.fulfilled, (s, a) => Object.assign(s, a.payload));
    b.addCase(refresh.fulfilled, (s, a) => { s.tokens = a.payload.tokens; });
  }
});
export const { logoutLocal } = slice.actions;
export default slice.reducer;
