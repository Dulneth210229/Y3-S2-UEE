import { BASE_URL } from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function uploadEducationCertificate(localUri) {
  const token = await AsyncStorage.getItem('token');
  const name = localUri.split('/').pop() || 'certificate.jpg';
  const form = new FormData();
  form.append('file', { uri: localUri, name, type: 'image/jpeg' });

  const res = await fetch(`${BASE_URL}/api/upload/education-certificate`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    body: form
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json(); // { certificateUrl }
}
