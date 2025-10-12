import { TextInput, View, Text } from 'react-native';
export default function Input({ label, ...props }) {
  return (
    <View style={{ marginVertical: 8 }}>
      {label ? <Text style={{ marginBottom: 6, color: '#e5e7eb' }}>{label}</Text> : null}
      <TextInput {...props} style={[{ backgroundColor: '#111827', color: '#fff', padding: 12, borderRadius: 10 } , props.style]} />
    </View>
  );
}
