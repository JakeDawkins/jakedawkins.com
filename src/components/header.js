import React from 'react';
import Link from './link';
import styled, { css } from 'react-emotion';

import logo from '../assets/jd-logo.png';

const Title = styled.p({
  margin: '0 0 0 8px',
  fontWeight: 600,
});

const Wrapper = styled.div({
  flex: 1,
  backgroundColor: '#f6f8fa',
  borderBottomWidth: 1,
  borderBottomColor: '#dddddd',
  padding: 8,
  flexDirection: 'row',
  alignItems: 'center',
});

export default ({ title }) => (
  <Wrapper>
    <Link
      to="/"
      style={{
        textDecoration: 'none',
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <img src={logo} width={16} height={10} className={css({ margin: 0 })} />
      <Title>{title}</Title>
    </Link>
  </Wrapper>
);
