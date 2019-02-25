import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div({
  display: 'flex',
  flex: 1,
  backgroundColor: '#f6f8fa',
  borderTopWidth: 1,
  borderTopColor: '#dddddd',
  padding: 8,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});

const Text = styled.p({
  margin: 0,
  padding: 0,
  fontFamily: 'sans-serif',
  fontSize: 14,
});

const Footer = () => (
  <Wrapper>
    <Text>&copy;2019 Jake Dawkins</Text>
  </Wrapper>
);

export default Footer;
