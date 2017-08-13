import React from 'react';
import styles from '../util/styles';

console.log(styles);
export default ({ heading, subHeading }) =>
  <div style={styles.wrapper}>
    <h1 style={{ ...styles.heading, ...headerStyles.main }}>
      {heading}
    </h1>
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
