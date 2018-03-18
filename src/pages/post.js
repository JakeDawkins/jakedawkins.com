import React from 'react';
import Link from 'gatsby-link';
import { View, Text } from 'react-primitives';

const Post = () => (
  <View>
    <Text>Hi from the second page</Text>
    <Text>Welcome to page 2</Text>
    <Link to="/">Go back to the homepage</Link>
  </View>
);

export default Post;
