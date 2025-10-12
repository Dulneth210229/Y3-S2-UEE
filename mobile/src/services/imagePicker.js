import * as ImagePicker from 'expo-image-picker';

export async function pickImage() {
  const res = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.7 });
  if (res.canceled) return null;
  return res.assets[0];
}
