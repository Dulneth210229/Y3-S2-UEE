import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './client';

const KEY = 'offlineQueue';

export async function queueRequest(req) {
  const q = JSON.parse((await AsyncStorage.getItem(KEY)) || '[]');
  q.push(req);
  await AsyncStorage.setItem(KEY, JSON.stringify(q));
}

export async function syncQueue() {
  const state = await NetInfo.fetch();
  if (!state.isConnected) return;
  const q = JSON.parse((await AsyncStorage.getItem(KEY)) || '[]');
  const rest = [];
  for (const item of q) {
    try { await api(item.method || 'post')(item.url, item.body); }
    catch { rest.push(item); }
  }
  await AsyncStorage.setItem(KEY, JSON.stringify(rest));
}
