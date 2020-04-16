// button component with 3d shadow, 80s style :)
import React from 'react';

import { rhythm } from '../utils/typography';

const Button = ({ children, style }) => {
  return (
    <span
      style={{
        textAlign: 'left',
        fontSize: '14px',
        lineHeight: '14px',
        fontWeight: '600',
        backgroundColor: '#fff',
        border: 'solid #333 2px',
        display: 'inline-block',
        borderRadius: '5px',
        padding: '6px 12px',
        paddingBottom: '5px',
        cursor: 'pointer',
        position: 'relative',
        verticalAlign: 'middle',
        ':hover': {
          // todo fix
          backgroundColor: '#f5f5f5',
          boxShadow: '2px 2px 0 #333',
        },
        color: '#333',
        fontFamily: "'Open Sans', sans-serif",
        ...style,
      }}
    >
      <span style={{ padding: 0, margin: 0 }}>{children}</span>
    </span>
  );
};

export default Button;
