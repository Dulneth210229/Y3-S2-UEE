import { View, Text } from 'react-native';
export default function MessageBubble({ msg, me }) {
  return (
    <View style={{ alignSelf: me ? 'flex-end' : 'flex-start', backgroundColor: me ? '#2563eb' : '#111827', padding: 10, borderRadius: 12, marginVertical: 4, maxWidth:'80%' }}>
      <Text style={{ color:'#fff' }}>{msg.body}</Text>
      <Text style={{ color:'#e5e7eb', fontSize:10, marginTop:4 }}>{new Date(msg.createdAt).toLocaleTimeString()}</Text>
    </View>
  );
}
