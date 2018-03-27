import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import Link, { isInternal } from './link';
import Heading from './heading';

export const Item = ({
  title,
  description,
  readMoreTitle,
  readMoreUrl,
  style,
}) => (
  <View style={style}>
    {/* <Text style={styles.title}>{title}</Text> */}
    <Heading level={4} text={title} rule={false} />
    <Text style={styles.description}>{description}</Text>
    <Link
      to={readMoreUrl}
      style={linkStyle}
      target={isInternal(readMoreUrl) ? '' : '_blank'}
    >
      {readMoreTitle}
    </Link>
  </View>
);

const linkStyle = {
  textDecoration: 'none',
  color: 'blue',
  marginTop: 4,
  fontSize: 16,
  fontFamily: 'sans-serif',
};

const styles = StyleSheet.create({
  description: { fontSize: 16, marginTop: 4 },
  title: { fontWeight: 'bold', fontSize: 16 },
});

export default Item;
