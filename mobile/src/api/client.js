import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({ baseURL: Constants.expoConfig.extra.API_URL });

api.interceptors.request.use(async (config) => {
  try {
    const persistRaw = await AsyncStorage.getItem('persist:root');
    if (persistRaw) {
      const persist = JSON.parse(persistRaw);
      const auth = JSON.parse(persist.auth || '{}');
      const token = auth.tokens?.accessToken;
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

api.interceptors.response.use(undefined, async (error) => {
  const original = error.config;
  if (error.response?.status === 401 && !original._retry) {
    original._retry = true;
    try {
      const persist = JSON.parse((await AsyncStorage.getItem('persist:root')) || '{}');
      const authState = JSON.parse(persist.auth || '{}');
      const refreshToken = authState.tokens?.refreshToken;
      if (refreshToken) {
        const res = await axios.post(`${Constants.expoConfig.extra.API_URL}/auth/refresh`, { refreshToken });
        const tokens = res.data.data.tokens;
        authState.tokens = tokens;
        persist.auth = JSON.stringify(authState);
        await AsyncStorage.setItem('persist:root', JSON.stringify(persist));
        original.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return axios(original);
      }
    } catch {}
  }
  return Promise.reject(error);
});

export default api;
