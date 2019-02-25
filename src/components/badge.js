import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div(({ style }) => ({
  display: 'flex',
  height: 20,
  borderRadius: 3,
  flexDirection: 'row',
  alignItems: 'center',
  overflow: 'hidden',
  alignSelf: 'flex-start',
  marginTop: 8,
  ...style,
}));

const Segment = styled.div(({ color }) => ({
  paddingLeft: 8,
  paddingRight: 8,
  backgroundColor: color,
  flexGrow: 1,
}));

const Text = styled.p({
  fontSize: 10,
  color: 'white',
  margin: 0,
  fontFamily: 'sans-serif',
  letterSpacing: 0,
});

export const Badge = ({
  leftText,
  rightText,
  leftColor = '#606060',
  rightColor = '#000000',
  style,
}) => {
  return (
    <Wrapper style={style}>
      <Segment color={leftColor}>
        <Text>{leftText}</Text>
      </Segment>
      <Segment color={rightColor}>
        <Text>{rightText}</Text>
      </Segment>
    </Wrapper>
  );
};

export default Badge;
