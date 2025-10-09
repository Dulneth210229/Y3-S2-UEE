import React, { useState, useContext } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Field from '../components/Field';
import { signup, login as apiLogin, me } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

export default function SignupScreen() {
  const { setUser } = useContext(AuthContext);
  const [role, setRole] = useState('job_seeker'); 
  const [name, setName] = useState('Saman');
  const [email, setEmail] = useState('saman@example.com');
  const [password, setPassword] = useState('123456');

  const onSignup = async () => {
    try {
      await signup({ role, name, email, password });
      const { data } = await apiLogin({ email, password });
      await AsyncStorage.setItem('token', data.token);
      const meRes = await me();
      setUser(meRes.data);
    } catch (e) {
      Alert.alert('Signup failed', e?.response?.data?.message || e.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 16 }}>Signup</Text>
      <Field label="Role (job_seeker | employer)" value={role} onChangeText={setRole} />
      <Field label="Name" value={name} onChangeText={setName} />
      <Field label="Email" value={email} onChangeText={setEmail} />
      <Field label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Create Account" onPress={onSignup} />
    </View>
  );
}
