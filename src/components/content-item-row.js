import React from 'react';
import styled from '@emotion/styled';

import { Link, isInternal } from './';

const Wrapper = styled.div(({ style }) => ({
  flexDirection: 'column',
  ...style,
}));

const Description = styled.p({
  fontSize: 16,
  marginTop: 8,
});

const Title = styled.h5({
  marginBottom: 0,
  fontWeight: 600,
});

const linkStyle = {
  textDecoration: 'none',
  color: '#0366d6',
  marginTop: 4,
  fontSize: 16,
  fontFamily: 'sans-serif',
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
