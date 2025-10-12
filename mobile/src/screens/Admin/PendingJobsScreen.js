import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import api from '../../api/client';
import { useEffect, useState } from 'react';

export default function PendingJobsScreen({ navigation }) {
  const [list, setList] = useState([]);
  const load = () => api.get('/admin/jobs').then(r=> setList(r.data.data));
  useEffect(()=> { load(); }, []);
  const action = async (id, op) => { await api.patch(`/admin/jobs/${id}/${op}`); load(); };
  return (
    <View style={{ flex:1, backgroundColor:'#0b0f14', padding:12 }}>
      <Text style={{ color:'#fff', fontSize:22, fontWeight:'800' }}>Pending Jobs</Text>
      <FlatList data={list} keyExtractor={i=>i._id} renderItem={({item})=>(
        <View style={{ backgroundColor:'#111827', padding:12, borderRadius:12, marginVertical:6 }}>
          <Text style={{ color:'#fff', fontWeight:'700' }}>{item.title}</Text>
          <View style={{ flexDirection:'row', gap:8, marginTop:8 }}>
            <TouchableOpacity onPress={()=>action(item._id,'approve')}><Text style={{ color:'#22c55e' }}>Approve</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>action(item._id,'reject')}><Text style={{ color:'#ef4444' }}>Reject</Text></TouchableOpacity>
          </View>
        </View>
      )}/>
    </View>
  );
}
