import { View, Text } from 'react-native';
export default function OfflineNotice({ online }) {
  if (online) return null;
  return (
    <View style={{ backgroundColor:'#ef4444', padding:8 }}>
      <Text style={{ color:'#fff', textAlign:'center' }}>Offline: actions will be queued</Text>
    </View>
  );
}
