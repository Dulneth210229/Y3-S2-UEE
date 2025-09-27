import React, { useState, useContext } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Field from '../components/Field';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('saman@example.com');
  const [password, setPassword] = useState('123456');

  const onLogin = async () => {
    try { await login(email, password); }
    catch (e) { Alert.alert('Login failed', e?.response?.data?.message || e.message); }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 16 }}>Login</Text>
      <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Field label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={onLogin} />
      <View style={{ height: 12 }} />
      <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}
