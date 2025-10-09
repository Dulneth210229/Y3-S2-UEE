import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LEVEL_TO_TEXT = { 1: 'Bronze', 2: 'Silver', 3: 'Gold' };

export default function BadgeChip({ badge }) {
  return (
    <View style={[styles.chip, styles[`lvl${badge.level}`]]}>
      <Text style={styles.txt}>{badge.skillKey}: {LEVEL_TO_TEXT[badge.level] || badge.level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16, marginRight: 8, marginBottom: 8 },
  txt: { color: '#fff', fontWeight: '600' },
  lvl1: { backgroundColor: '#b87333' },
  lvl2: { backgroundColor: '#a0a0a0' },
  lvl3: { backgroundColor: '#d4af37' }
});



