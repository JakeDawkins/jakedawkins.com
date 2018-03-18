import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';

const fontStyles = [
  null,
  { fontSize: 32, fontWeight: '600' },
  { fontSize: 24, fontWeight: '600' },
  { fontSize: 18.72, fontWeight: '600' },
  { fontSize: 16, fontWeight: '600' },
  { fontSize: 13.28, fontWeight: '600' },
  { fontSize: 10.72, fontWeight: '600' },
];

const Heading = ({ text, rule = true, level = 1, style }) => (
  <View style={style}>
    <Text style={fontStyles[level]}>{text}</Text>
    {rule ? <View style={styles.rule} /> : null}
  </View>
);
const styles = StyleSheet.create({
  rule: {
    height: 1,
    width: '100%',
    backgroundColor: '#eaecef',
    marginTop: 8,
  },
});

export default Heading;
