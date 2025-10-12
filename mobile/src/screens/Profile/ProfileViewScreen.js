import { View, Text, Image } from 'react-native';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/Button';
import { pickImage } from '../../services/imagePicker';
import api from '../../api/client';

export default function ProfileViewScreen() {
  const { user, logout } = useAuth();

  const upload = async () => {
    const img = await pickImage();
    if (!img) return;
    const form = new FormData();
    form.append('image', { uri: img.uri, name: 'photo.jpg', type: 'image/jpeg' });
    const url = await api.post('/uploads/image', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r=>r.data.data.url);
    await api.post('/users/me/photo', { url });
    alert('Photo updated');
  };

  return (
    <View style={{ flex:1, backgroundColor:'#0b0f14', padding:16 }}>
      <Image source={{ uri: user?.profile?.photo }} style={{ width:96, height:96, borderRadius:48, backgroundColor:'#111827' }} />
      <Text style={{ color:'#fff', fontSize:20, fontWeight:'800', marginVertical:8 }}>{user?.profile?.name || user?.email}</Text>
      <Button title="Upload Photo" onPress={upload} />
      <Button title="Logout" onPress={logout} style={{ marginTop:8 }} />
    </View>
  );
}
