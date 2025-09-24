import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ CHANGE THIS to match where your backend runs
// Android emulator: http://10.0.2.2:4000
export const BASE_URL = 'http://localhost:3000';

const client = axios.create({
  baseURL: BASE_URL + '/api',
  timeout: 15000,
});

client.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
