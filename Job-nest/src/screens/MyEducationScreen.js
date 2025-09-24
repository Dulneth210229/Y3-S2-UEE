import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { listMyEducation } from '../api/education';
import BadgeChip from '../components/BadgeChip';

export default function MyEducationScreen() {
  const [data, setData] = useState(null);

  useEffect(()=>{ (async ()=>{
    const { data } = await listMyEducation();
    setData(data);
  })(); }, []);

  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontSize:20, fontWeight:'700' }}>My Education</Text>
      <Text>Highest: {data?.educationLevel} (rank: {data?.eduRank})</Text>
      <Text>Trust: {data?.trustScore}</Text>

      <Text style={{ marginTop:12, fontWeight:'700' }}>Badges</Text>
      <View style={{ flexDirection:'row', flexWrap:'wrap', marginTop:8 }}>
        {(data?.badges || []).map((b)=> (<BadgeChip key={b._id} badge={b} />))}
      </View>

      <Text style={{ marginTop:12, fontWeight:'700' }}>Entries</Text>
      <FlatList
        style={{ marginTop:8 }}
        data={data?.educations || []}
        keyExtractor={(_, i)=>String(i)}
        renderItem={({ item, index }) => (
          <View style={{ padding:10, borderWidth:1, borderColor:'#ddd', borderRadius:8, marginBottom:8 }}>
            <Text>{index+1}. {item.level} — {item.field} @ {item.institution} ({item.year || 'N/A'})</Text>
            <Text>Verified: {item.verified ? 'Yes' : 'No'}</Text>
          </View>
        )}
      />
    </View>
  );
}
