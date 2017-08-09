import React from 'react';
import styles from './util/styles';

export default () =>
  <div className="header" style={{ ...styles.wrapper, marginTop: 32 }}>
    <h1>Jake Dawkins</h1>
    <h2 style={{ marginTop: 8 }}>I make dope stuff</h2>
  </div>;
