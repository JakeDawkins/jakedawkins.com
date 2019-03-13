import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.span({
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
    backgroundColor: '#f5f5f5',
    boxShadow: '2px 2px 0 #333',
  },
  color: '#333',
  fontFamily: "'Open Sans', sans-serif",
});

const ButtonText = styled.span({
  padding: 0,
  margin: 0,
});

export default ({ children, style }) => {
  return (
    <Wrapper style={style}>
      <ButtonText>{children}</ButtonText>
    </Wrapper>
  );
};
