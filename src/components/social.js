import React from 'react';
import styles from '../util/styles';

import Twitter from '../assets/twitter.png';
import Github from '../assets/github.png';
import Medium from '../assets/medium.png';

const icon = type => {
  switch (type.toLowerCase()) {
    case 'twitter':
      return Twitter;
    case 'github':
      return Github;
    case 'medium':
      return Medium;
    default:
      return null;
  }
};

export default ({ accounts }) =>
  <div style={{ ...styles.wrapper, ...socialStyles.wrapper }}>
    {accounts &&
      accounts.map(({ name, url }, i) =>
        <a href={url} key={name}>
          <img
            style={{ marginLeft: i === 0 ? 0 : 16 }}
            width="64"
            height="64"
            src={icon(name)}
            alt={name}
          />
        </a>
      )}
  </div>;

const socialStyles = {
  wrapper: {
    flexDirection: 'row',
  },
};
