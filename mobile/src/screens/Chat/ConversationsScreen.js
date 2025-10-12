import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import useChatSocket from '../../hooks/useChatSocket';
import { useEffect, useState } from 'react';
import api from '../../api/client';

export default function ConversationsScreen({ navigation }) {
  useChatSocket();
  const [list, setList] = useState([]);
  useEffect(()=> { api.get('/conversations').then(r=> setList(r.data.data)); }, []);
  return (
    <View style={{ flex:1, backgroundColor:'#0b0f14', padding:12 }}>
      <Text style={{ color:'#fff', fontSize:22, fontWeight:'800' }}>Conversations</Text>
      <FlatList data={list} keyExtractor={i=>i._id} renderItem={({item})=>(
        <TouchableOpacity onPress={()=> navigation.navigate('ChatScreen', { conversation: item })} style={{ padding:12, backgroundColor:'#111827', borderRadius:12, marginVertical:6 }}>
          <Text style={{ color:'#fff' }}>{item.lastMessage || 'New chat'}</Text>
        </TouchableOpacity>
      )}/>
    </View>
  );
}
