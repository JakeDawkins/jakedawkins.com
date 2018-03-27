import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { View, StyleSheet } from 'react-primitives';

import Header from '../components/header';
import Footer from '../components/footer';
import './index.css';

import siteData from '../info';

const TemplateWrapper = ({ children }) => {
  return (
    <View style={styles.container}>
      <Helmet
        title="Jake Dawkins"
        meta={[
          {
            name: 'description',
            content: 'Personal site of Jake Dawkins, Software Engineer in NYC',
          },
          {
            name: 'keywords',
            content: 'software, engineering, javascript, technology, tech',
          },
        ]}
      />
      <View style={styles.body}>
        <Header title={siteData.title} />
        <View style={styles.content}>{children()}</View>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 8, marginVertical: 16 },
  body: {
    margin: '0 auto',
    maxWidth: 960,
    marginHorizontal: 'auto',
    width: '100%',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 3,
  },
  content: {
    padding: 48,
  },
});

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
