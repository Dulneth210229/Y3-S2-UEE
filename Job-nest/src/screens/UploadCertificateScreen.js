import React, { useState } from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadEducationCertificate } from '../api/upload';

export default function UploadCertificateScreen() {
  const [uri, setUri] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const pickImage = async () => {
    const res = await launchImageLibrary({ mediaType: 'photo' });
    if (res.assets && res.assets[0]?.uri) setUri(res.assets[0].uri);
  };

  const doUpload = async () => {
    try {
      const { certificateUrl } = await uploadEducationCertificate(uri);
      setUploadedUrl(certificateUrl);
      Alert.alert('Uploaded!', 'Copy the URL into Add Education screen.');
    } catch (e) { Alert.alert('Upload failed', e.message); }
  };

  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontSize:20, fontWeight:'700' }}>Upload Education Certificate</Text>
      <View style={{ height:10 }} />
      <Button title="Pick Image" onPress={pickImage} />
      {uri && <Image source={{ uri }} style={{ width:'100%', height:220, marginTop:12 }} />}
      <View style={{ height:10 }} />
      <Button title="Upload" onPress={doUpload} disabled={!uri} />
      {uploadedUrl && <Text style={{ marginTop:10 }}>URL: {uploadedUrl}</Text>}
    </View>
  );
}
