import React from 'react';
import styles from '../util/styles';

import EditorialIcon from '../assets/Editorial.png';
import PhotoIcon from '../assets/Photo.png';
import LinkIcon from '../assets/Link.png';

const icon = type => {
  switch (type) {
    case 'editorial':
      return EditorialIcon;
    case 'photo':
      return PhotoIcon;
    case 'link':
      return LinkIcon;
  }
};

export default ({ content }) =>
  <div style={styles.wrapper}>
    {content.map(({ type, title, url }, i) =>
      <a
        style={{ ...contentStyles.item, marginTop: i === 0 ? 0 : 16 }}
        href={url}
      >
        <div style={contentStyles.item}>
          <img style={contentStyles.img} src={icon(type)} />
          <h2 style={contentStyles.h2}>
            {title}
          </h2>
        </div>
      </a>
    )}
  </div>;

const contentStyles = {
  item: {
    width: '100%',
    height: 128,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textDecoration: 'none',
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
