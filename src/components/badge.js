import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';

export const Badge = ({
  leftText,
  rightText,
  leftColor = '#606060',
  rightColor = '#000000',
  style,
}) => {
  const styles = createStyles(rightColor);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.left}>
        <Text style={styles.text}>{leftText}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.text}>{rightText}</Text>
      </View>
    </View>
  );
};

const createStyles = rightColor =>
  StyleSheet.create({
    container: {
      height: 20,
      borderRadius: 3,
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      alignSelf: 'flex-start',
      marginTop: 8,
    },
    left: {
      paddingHorizontal: 8,
      backgroundColor: '#606060',
    },
    right: {
      paddingHorizontal: 8,
      backgroundColor: rightColor,
    },
    text: { fontSize: 10, color: 'white' },
  });

export default Badge;
