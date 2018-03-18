import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';

export const List = ({ items }) => (
  <View>
    {items
      ? items.map(({ link, description }) => {
          return null;
        })
      : null}
  </View>
);

const styles = StyleSheet.create({});

export default List;
