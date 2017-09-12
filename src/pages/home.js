import React from 'react';

import { gql, graphql } from 'react-apollo';

import Loading from 'react-spinkit';

import Header from '../components/header';
import ContentList from '../components/content-list';
import Social from '../components/social';

// import Footer from '../components/footer';
const Footer = require('../components/reason/footer').default;

const Home = ({ data }) =>
  data.loading ? (
    <Loading fadeIn={'quarter'} style={{ marginTop: 64 }} name="pacman" />
  ) : (
    <div style={styles.container}>
      <Header
        heading={data.allSites[0].title}
        subHeading={data.allSites[0].tagline}
      />
      <ContentList content={data.allPosts} />
      <Social accounts={data.allSocialAccounts} />
      <Footer />
    </div>
  );

const styles = {
  container: {
    minHeight: 'min-content',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

export default graphql(gql`
  {
    allSites {
      id
      title
      tagline
    }
    allPosts(orderBy: createdAt_DESC) {
      title
      type
      id
      externalLink
    }
    allSocialAccounts {
      name
      url
    }
  }
`)(Home);
