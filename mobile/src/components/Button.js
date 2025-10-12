import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
export default function Button({ title, onPress, loading, style }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading} style={[{ backgroundColor: '#2563eb', padding: 14, borderRadius: 12, alignItems: 'center' }, style]}>
      {loading ? <ActivityIndicator /> : <Text style={{ color: '#fff', fontWeight: '600' }}>{title}</Text>}
    </TouchableOpacity>
  );
}
