import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import Field from '../components/Field';
import { searchSeekers } from '../api/search';

export default function SearchSeekersScreen({ navigation }) {
  const [minEducation, setMinEducation] = useState('al');
  const [skill, setSkill] = useState('carpenter');
  const [minTrust, setMinTrust] = useState('0');
  const [results, setResults] = useState([]);

  const onSearch = async () => {
    const { data } = await searchSeekers({
      minEducation, skill, minTrust: Number(minTrust) || 0, page:1, limit:20, sort:'-trust'
    });
    setResults(data.results || []);
  };

  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontSize:20, fontWeight:'700' }}>Search Seekers</Text>
      <Field label="Min Education" value={minEducation} onChangeText={setMinEducation} />
      <Field label="Skill (exact)" value={skill} onChangeText={setSkill} />
      <Field label="Min Trust" value={minTrust} onChangeText={setMinTrust} keyboardType="numeric" />
      <Button title="Search" onPress={onSearch} />
      <FlatList
        style={{ marginTop:12 }}
        data={results}
        keyExtractor={(item)=>item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={()=>navigation.navigate('SeekerPublic', { seekerId: item._id })}
            style={{ padding:12, borderWidth:1, borderColor:'#ddd', borderRadius:8, marginBottom:8 }}
          >
            <Text style={{ fontWeight:'700' }}>{item.name}</Text>
            <Text>Edu: {item.educationLevel} | Trust: {item.trustScore}</Text>
            <Text>Skills: {(item.skills || []).join(', ')}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
