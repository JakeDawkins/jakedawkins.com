import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-primitives';
import Link from './link';

import logo from '../assets/jd-logo.png';

export default ({ title }) => (
  <View style={styles.container}>
    <Link
      to="/"
      style={{
        textDecoration: 'none',
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </Link>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: { height: 10, width: 16 },
  title: { marginLeft: 8, fontWeight: 'bold' },
});
