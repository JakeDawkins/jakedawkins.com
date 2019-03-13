import React from 'react';
import styled from '@emotion/styled';
import Link from './link';
import { Button } from './';

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const Title = styled.h1(({ small }) => ({
  margin: '0 0 0 0',
  fontWeight: 900,
  fontFamily: 'Merriweather',
  fontSize: small ? 32 : 64,
  borderBottom: '5px solid #333',
  display: 'inline-block',
  color: '#333',
}));

const LinkWrapper = styled(Link)({
  textDecoration: 'none',
  color: '#333',
  flexDirection: 'column',
});

const SocialWrapper = styled.span();
const buttonStyle = {
  marginRight: '16px',
  marginTop: '32px',
};

export default ({ title, links, atHomePage = true }) => (
  <Wrapper>
    <LinkWrapper to="/">
      {atHomePage ? (
        title.split(' ').map((word, i, all) => {
          if (i === 0) return <Title>{word}</Title>;
          return (
            <>
              <br />
              <Title>{word}</Title>
            </>
          );
        })
      ) : (
        <Title small={true}>Back to home...</Title>
      )}
    </LinkWrapper>
    {atHomePage && (
      <SocialWrapper>
        {links.map(link => (
          <Link
            key={link.url}
            to={link.url}
            style={{ textDecoration: 'none' }}
            target="_blank"
          >
            <Button style={buttonStyle}>{link.siteName}</Button>
          </Link>
        ))}
      </SocialWrapper>
    )}
  </Wrapper>
);
