import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Field from '../components/Field';
import { addEducation } from '../api/education';

const LEVELS = [
  'none','grade6','grade8','ol','al',
  'nvq1','nvq2','nvq3','nvq4','nvq5',
  'certificate','diploma','hnd','degree','masters','mphil','phd'
];

export default function AddEducationScreen() {
  const [level, setLevel] = useState('al');
  const [field, setField] = useState('Science');
  const [institution, setInstitution] = useState('Kandy College');
  const [year, setYear] = useState('2020');
  const [certificateUrl, setCertificateUrl] = useState('');

  const onSave = async () => {
    try {
      const payload = { level, field, institution, year: Number(year) || undefined, certificateUrl };
      await addEducation(payload);
      Alert.alert('Saved', 'Education added.');
    } catch (e) { Alert.alert('Error', e?.response?.data?.message || e.message); }
  };

  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontSize:20, fontWeight:'700' }}>Add Education</Text>
      <Field label="Level (type one)" value={level} onChangeText={setLevel} />
      <Text style={{ color:'#666' }}>{LEVELS.join(' | ')}</Text>
      <Field label="Field" value={field} onChangeText={setField} />
      <Field label="Institution" value={institution} onChangeText={setInstitution} />
      <Field label="Year" value={year} onChangeText={setYear} keyboardType="numeric" />
      <Field label="Certificate URL" value={certificateUrl} onChangeText={setCertificateUrl} />
      <Button title="Save" onPress={onSave} />
    </View>
  );
}
