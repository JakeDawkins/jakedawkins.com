import React from 'react';
import Link from 'gatsby-link';
import { View, StyleSheet, Text, Image } from 'react-primitives';

const Footer = ({ title, subtitle }) => (
  <View style={styles.container}>
    <Text>&copy;2018 Jake Dawkins</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Footer;
