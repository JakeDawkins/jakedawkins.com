import React from 'react';
import styles from '../util/styles';

export default () =>
  <div style={{ ...styles.wrapper, ...footerStyles.wrapper }}>
    <small style={footerStyles.text}>
      &copy;2017 Jake Dawkins. It's okay. You can {' '}
      <a href="https://github.com/jakedawkins/jakedawkins.com">
        steal this shit
      </a>{' '}
      <a
        style={footerStyles.harambe}
        href="https://en.wikipedia.org/wiki/Killing_of_Harambe"
      >
        <span role="img" aria-label="monkey">
          🐒
        </span>
      </a>
    </small>
  </div>;

const footerStyles = {
  wrapper: {
    marginBottom: 32,
  },
  text: {
    letterSpacing: 1.2,
  },
  harambe: {
    textDecoration: 'none',
  },
};
