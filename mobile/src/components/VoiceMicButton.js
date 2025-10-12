import { TouchableOpacity, Text } from 'react-native';
export default function VoiceMicButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor:'#2563eb', padding:12, borderRadius:999, alignSelf:'center', marginVertical:10 }}>
      <Text style={{ color:'#fff' }}>🎤</Text>
    </TouchableOpacity>
  );
}
