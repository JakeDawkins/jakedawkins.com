import React from 'react';
import styles from '../util/styles';

import Twitter from '../assets/twitter.png';
import Github from '../assets/github.png';
import Medium from '../assets/medium.png';

const icon = type => {
  switch (type) {
    case 'twitter':
      return Twitter;
    case 'github':
      return Github;
    case 'medium':
      return Medium;
  }
};

export default ({ accounts }) =>
  <div style={{ ...styles.wrapper, ...socialStyles.wrapper }}>
    {accounts.map(({ name, url }, i) =>
      <a href={url}>
        <img
          style={{ marginLeft: i === 0 ? 0 : 16 }}
          width="64"
          height="64"
          src={icon(name)}
        />
      </a>
    )}
  </div>;

const socialStyles = {
  wrapper: {
    flexDirection: 'row',
  },
};
