import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

import { Header, Footer } from '../components';
import siteData from '../info';

const { socialAccounts, title, bio } = siteData;

const Wrapper = styled.div({
  flex: 1,
  flexGrow: 1,
  color: '#333333',
});

const Body = styled.div({
  flexDirection: 'column',
  margin: '16px auto 16px auto',
  maxWidth: 720,
  width: '100%',
  flexGrow: 1,
});

const Content = styled.div({
  wordWrap: 'break-word',
  flexGrow: 1,
});

const Layout = ({ children, atHomePage }) => (
  <Wrapper>
    <Helmet
      title="Jake Dawkins"
      meta={[
        {
          name: 'description',
          content: 'Personal site of Jake Dawkins, Software Engineer in NYC',
        },
        {
          name: 'keywords',
          content: 'software, engineering, javascript, technology, tech',
        },
      ]}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Merriweather:900|Open+Sans:400"
        rel="stylesheet"
      />
    </Helmet>
    <Global
      styles={css`
        html {
          background-color: #fafafa;
        }
      `}
    />
    <Body>
      <Header
        title={title}
        links={socialAccounts}
        atHomePage={atHomePage}
        bio={bio}
      />
      <Content>{children}</Content>
      <Footer />
    </Body>
  </Wrapper>
);

Layout.propTypes = {
  children: PropTypes.func,
  atHomePage: PropTypes.bool,
};

export default Layout;
