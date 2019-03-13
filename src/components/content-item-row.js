import React from 'react';
import styled from '@emotion/styled';

import { Link, isInternal } from './';

const Wrapper = styled.div(({ style }) => ({
  flexDirection: 'column',
  ...style,
}));

const Description = styled.p({
  fontSize: '16px',
  marginTop: '8px',
  fontFamily: "'Open Sans', sans-serif",
  margin: '8px 0',
  color: '#333',
});

const Title = styled.h3({
  fontSize: '16px',
  marginBottom: 0,
  fontWeight: 900,
  fontFamily: 'Merriweather',
  color: '#333',
});

const linkStyle = {
  textDecoration: 'none',
  color: '#0366d6',
  marginTop: '4px',
  fontSize: '16px',
  fontFamily: "'Open Sans', sans-serif",
};

export const Item = ({
  title,
  description,
  readMoreTitle,
  readMoreUrl,
  style,
}) => (
  <Wrapper style={style}>
    <Title>{title}</Title>
    <Description>{description}</Description>
    <Link
      to={readMoreUrl}
      style={linkStyle}
      target={isInternal(readMoreUrl) ? '' : '_blank'}
    >
      {readMoreTitle}
    </Link>
  </Wrapper>
);

export default Item;
