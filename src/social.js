import React from 'react';
import styles from './util/styles';

import Twitter from './assets/twitter.png';
import Github from './assets/github.png';
import Medium from './assets/medium.png';

export default () =>
  <div
    className="social"
    style={{ ...styles.wrapper, ...socialStyles.wrapper }}
  >
    <a href="https://twitter.com/jakedawkins">
      <img style={socialStyles.img} width="64" height="64" src={Twitter} />
    </a>
    <a href="https://github.com/jakedawkins">
      <img style={socialStyles.img} width="64" height="64" src={Github} />
    </a>
    <a href="https://medium.com/@jakedawkins">
      <img style={socialStyles.img} width="64" height="64" src={Medium} />
    </a>
  </div>;

const socialStyles = {
  wrapper: {
    flexDirection: 'row',
  },
  img: {
    marginLeft: 16,
  },
};
