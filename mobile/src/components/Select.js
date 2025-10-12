import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// IMPORTANT: install & build native deps: @react-native-picker/picker
export default function Select({ label, selectedValue, onValueChange, items = [] }) {
  return (
    <View style={{ marginVertical: 8 }}>
      {label ? <Text style={{ marginBottom: 6, color: '#e5e7eb' }}>{label}</Text> : null}
      <View style={{ backgroundColor: '#111827', borderRadius: 10 }}>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          {items.map(i => <Picker.Item key={i.value} label={i.label} value={i.value} />)}
        </Picker>
      </View>
    </View>
  );
}
