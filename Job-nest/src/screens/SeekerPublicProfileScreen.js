import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import BadgeChip from '../components/BadgeChip';
import { getSeekerPublic } from '../api/profile';

export default function SeekerPublicProfileScreen({ route }) {
  const { seekerId } = route.params;
  const [profile, setProfile] = useState(null);

  useEffect(()=>{ (async ()=>{
    try {
      const { data } = await getSeekerPublic(seekerId);
      setProfile(data);
    } catch (e) { Alert.alert('Error', e?.response?.data?.message || e.message); }
  })(); }, [seekerId]);

  if (!profile) return null;

  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontSize:20, fontWeight:'700' }}>{profile.name}</Text>
      <Text>Location: {profile.location || '—'}</Text>
      <Text>Bio: {profile.bio || '—'}</Text>
      <Text>Skills: {(profile.skills || []).join(', ')}</Text>
      <Text>Highest Education: {profile.educationLevel}</Text>
      <Text>Trust Score: {profile.trustScore}</Text>

      <Text style={{ marginTop:12, fontWeight:'700' }}>Badges</Text>
      <View style={{ flexDirection:'row', flexWrap:'wrap', marginTop:8 }}>
        {(profile.badges || []).map((b)=> (<BadgeChip key={b._id} badge={b} />))}
      </View>
    </View>
  );
}
