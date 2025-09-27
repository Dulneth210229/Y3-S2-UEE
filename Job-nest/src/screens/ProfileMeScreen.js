import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Field from '../components/Field';
import { getMyProfile, updateMyProfile } from '../api/profile';
import BadgeChip from '../components/BadgeChip';
import { AuthContext } from '../context/AuthContext';

export default function ProfileMeScreen({ navigation }) {
  const { user, setUser, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [profilePublic, setProfilePublic] = useState(true);

  const load = async () => {
    const { data } = await getMyProfile();
    setProfile(data);
    setLocation(data.location || '');
    setBio(data.bio || '');
    setSkillsText((data.skills || []).join(', '));
    setProfilePublic(data.profilePublic ?? true);
  };
  useEffect(()=>{ load(); }, []);

  const onSave = async () => {
    try {
      const skills = skillsText.split(',').map(s=>s.trim()).filter(Boolean);
      const { data } = await updateMyProfile({ location, bio, skills, profilePublic });
      setProfile(data); setUser(data);
      Alert.alert('Saved', 'Profile updated');
    } catch (e) { Alert.alert('Error', e?.response?.data?.message || e.message); }
  };

  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontSize:22, fontWeight:'700' }}>My Profile</Text>
      <Text>Role: {user?.role}</Text>
      <Field label="Location" value={location} onChangeText={setLocation} />
      <Field label="Bio" value={bio} onChangeText={setBio} multiline />
      <Field label="Skills (comma separated)" value={skillsText} onChangeText={setSkillsText} />
      <Text>Public Profile: {profilePublic ? 'Yes' : 'No'}</Text>
      <Button title={profilePublic ? 'Make Private' : 'Make Public'} onPress={()=>setProfilePublic(!profilePublic)} />
      <View style={{ height:10 }} />
      <Button title="Save" onPress={onSave} />

      <View style={{ height:16 }} />
      <Text style={{ fontWeight:'700' }}>Badges</Text>
      <View style={{ flexDirection:'row', flexWrap:'wrap', marginTop:8 }}>
        {(profile?.badges || []).map((b)=> (<BadgeChip key={b._id} badge={b} />))}
      </View>

      <View style={{ height:16 }} />
      <Button title="Upload Education Certificate" onPress={()=>navigation.navigate('UploadCertificate')} />
      <View style={{ height:8 }} />
      <Button title="Add Education" onPress={()=>navigation.navigate('AddEducation')} />
      <View style={{ height:8 }} />
      <Button title="My Education" onPress={()=>navigation.navigate('MyEducation')} />
      {user?.role === 'employer' && (
        <>
          <View style={{ height:8 }} />
          <Button title="Search Seekers" onPress={()=>navigation.navigate('SearchSeekers')} />
        </>
      )}
      <View style={{ height:16 }} />
      <Button title="Logout" color="red" onPress={logout} />
    </View>
  );
}
