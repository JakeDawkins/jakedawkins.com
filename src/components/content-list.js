import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../util/styles';

import EditorialIcon from '../assets/Editorial.png';
import PhotoIcon from '../assets/Photo.png';
import LinkIcon from '../assets/Link.png';

const icon = type => {
  switch (type.toLowerCase()) {
    case 'editorial':
      return EditorialIcon;
    case 'photo':
      return PhotoIcon;
    case 'link':
      return LinkIcon;
    default:
      return null;
  }
};

export default ({ content }) =>
  <div style={styles.wrapper}>
    {content &&
      content.map(
        ({ type, title, externalLink, id }, i) =>
          type === 'link'
            ? <a
                key={title}
                style={{ ...contentStyles.item, marginTop: i === 0 ? 0 : 8 }}
                href={externalLink}
              >
                <div style={contentStyles.item}>
                  <img style={contentStyles.img} src={icon(type)} alt={type} />
                  <h2 style={contentStyles.h2}>
                    {title}
                  </h2>
                </div>
              </a>
            : <Link
                key={title}
                style={{ ...contentStyles.item, marginTop: i === 0 ? 0 : 8 }}
                to={`post/${id}`}
              >
                <div style={contentStyles.item}>
                  <img style={contentStyles.img} src={icon(type)} alt={type} />
                  <h2 style={contentStyles.h2}>
                    {title}
                  </h2>
                </div>
              </Link>
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
