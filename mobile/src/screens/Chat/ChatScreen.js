import { View, TextInput, KeyboardAvoidingView, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import api from '../../api/client';
import MessageBubble from '../../components/MessageBubble';
import Button from '../../components/Button';
import useAuth from '../../hooks/useAuth';
import io from 'socket.io-client';
import Constants from 'expo-constants';

export default function ChatScreen({ route }) {
  const { conversation } = route.params;
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');
  const { user } = useAuth();

  useEffect(()=> {
    api.get(`/messages/${conversation._id}`).then(r => setMsgs(r.data.data));
    const socket = io(Constants.expoConfig.extra.API_URL.replace(/^http/,'ws'));
    socket.emit('joinConversation', conversation._id);
    socket.on('message', (msg) => { if (msg.conversation === conversation._id) setMsgs(m => [...m, msg]); });
    return () => socket.disconnect();
  }, []);

  const send = async () => {
    const r = await api.post(`/messages/${conversation._id}`, { body: text });
    setMsgs(m => [...m, r.data.data]); setText('');
  };

  return (
    <KeyboardAvoidingView style={{ flex:1, backgroundColor:'#0b0f14', padding:12 }} behavior="padding">
      <FlatList data={msgs} keyExtractor={i=>i._id} renderItem={({item}) => (
        <MessageBubble msg={item} me={item.sender === user._id} />
      )}/>
      <View style={{ flexDirection:'row', gap:8 }}>
        <TextInput value={text} onChangeText={setText} placeholder="Type…" placeholderTextColor="#9ca3af"
          style={{ flex:1, backgroundColor:'#111827', color:'#fff', padding:12, borderRadius:12 }} />
        <Button title="Send" onPress={send} />
      </View>
    </KeyboardAvoidingView>
  );
}
