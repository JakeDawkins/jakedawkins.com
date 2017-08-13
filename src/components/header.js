import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../util/styles';

export default ({ heading, subHeading }) =>
  <div style={styles.wrapper}>
    <Link to="/">
      <h1 style={{ ...styles.heading, ...headerStyles.main }}>
        {heading}
      </h1>
    </Link>
    <h3
      style={{
        ...styles.subHeading,
        ...headerStyles.subHeading,
        ...{ marginTop: 8 },
      }}
    >
      {subHeading}
    </h3>
  </div>;

const headerStyles = {
  main: {
    backgroundColor: 'white',
    padding: '8px 32px',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  subHeading: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '4px 8px',
    marginBottom: '0px',
    letterSpacing: 1.2,
  },
};
