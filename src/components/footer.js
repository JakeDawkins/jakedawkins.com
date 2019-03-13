import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  marginTop: '32px',
});

const Text = styled.p({ fontFamily: "'Open Sans', sans-serif" });

const Footer = () => (
  <Wrapper>
    <Text>&copy;2019 Jake Dawkins</Text>
  </Wrapper>
);

export default Footer;
