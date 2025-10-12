import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import api from '../../api/client';

export default function AdminMetricsScreen() {
  const [m, setM] = useState(null);
  useEffect(()=> { api.get('/admin/metrics').then(r=> setM(r.data.data)); }, []);
  if (!m) return null;
  return (
    <View style={{ flex:1, backgroundColor:'#0b0f14', padding:16 }}>
      <Text style={{ color:'#fff', fontSize:22, fontWeight:'800' }}>Metrics</Text>
      <Text style={{ color:'#e5e7eb', marginTop:8 }}>Jobs: {m.jobs}</Text>
      <Text style={{ color:'#e5e7eb' }}>Applications: {m.applications}</Text>
      <Text style={{ color:'#e5e7eb' }}>Conversations: {m.conversations}</Text>
      <Text style={{ color:'#e5e7eb' }}>Revenue: ${(m.revenueCents/100).toFixed(2)}</Text>
    </View>
  );
}
