import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';

import { Header, Footer } from '../components';
import siteData from '../info';

const Wrapper = styled.div({
  flex: 1,
  flexGrow: 1,
  backgroundColor: '#fafafa',
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
  // padding: 48,
  wordWrap: 'break-word',
  flexGrow: 1,
});

const socialAccounts = siteData.socialAccounts;

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
    />
    <link
      href="https://fonts.googleapis.com/css?family=Merriweather:900|Open+Sans:400"
      rel="stylesheet"
    />
    <Body>
      <Header
        title={siteData.title}
        links={socialAccounts}
        atHomePage={atHomePage}
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
