import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Field({ label, value, onChangeText, secureTextEntry, keyboardType, multiline }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && { height: 90, textAlignVertical: 'top' }]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: { fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 }
});
