import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import Link from 'gatsby-link';

export const Item = ({
  title,
  description,
  readMoreTitle,
  readMoreUrl,
  style,
}) => (
  <View style={style}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    {readMoreUrl && readMoreUrl.includes('http') ? (
      <a style={linkStyle} href={readMoreUrl} target="_blank">
        {readMoreTitle}
      </a>
    ) : (
      <Link to={readMoreUrl} style={linkStyle}>
        {readMoreTitle}
      </Link>
    )}
  </View>
);

const linkStyle = {
  textDecoration: 'none',
  color: 'blue',
  marginTop: 4,
  fontSize: 18,
  fontFamily: 'sans-serif',
};

const styles = StyleSheet.create({
  description: { fontSize: 18, marginTop: 4 },
  title: { fontWeight: 'bold', fontSize: 18 },
});

export default Item;
