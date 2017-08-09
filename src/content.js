import React from 'react';
import styles from './util/styles';

import EditorialIcon from './assets/Editorial.png';
import PhotoIcon from './assets/Photo.png';
import LinkIcon from './assets/Link.png';

export default () =>
  <div style={styles.wrapper}>
    <div style={contentStyles.content}>
      <img style={contentStyles.img} src={EditorialIcon} />
      <h2 style={contentStyles.h2}>The Importance of Unimportant Hobbies</h2>
    </div>
    <div style={contentStyles.content}>
      <img style={contentStyles.img} src={PhotoIcon} />
      <h2 style={contentStyles.h2}>Click this because I want you to</h2>
    </div>
    <div style={contentStyles.content}>
      <img style={contentStyles.img} src={LinkIcon} />
      <h2 style={contentStyles.h2}>I Promise This Link Is Safe</h2>
    </div>
  </div>;

const contentStyles = {
  content: {
    marginTop: '8px',
    width: '100%',
    height: 128,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  h2: {
    display: 'inline-block',
    textAlign: 'left',
    padding: 0,
    marginLeft: 16,
    marginRight: 16,
  },
  img: {
    height: 64,
    width: 64,
    marginLeft: 16,
  },
};
