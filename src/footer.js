import React from 'react';
import styles from './util/styles';

export default () =>
  <div
    className="footer"
    style={{ ...styles.wrapper, ...footerStyles.wrapper }}
  >
    <small>
      &copy;2017 Jake Dawkins. It's okay. You can {' '}
      <a href="https://github.com/jakedawkins/jakedawkins.com">
        steal this shit
      </a>{' '}
      🐒
    </small>
  </div>;

const footerStyles = {
  wrapper: {
    marginBottom: 32,
  },
};
