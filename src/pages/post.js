import React from 'react';
import Markdown from 'react-markdown';
import { gql, graphql } from 'react-apollo';
import Loading from 'react-spinkit';

import Header from '../components/header';
import Footer from '../components/footer';

export const Post = ({ data }) =>
  data.loading
    ? <Loading fadeIn={'quarter'} style={{ marginTop: 64 }} name="pacman" />
    : <div style={styles.container}>
        <Header heading="Jake Dawkins" subHeading="I make dope stuff" />

        <div className={'markdown'} style={styles.markdown}>
          <h1>
            {data.Post.title}
          </h1>
          <hr />
          <Markdown source={data.Post.body} />
        </div>
        <Footer />
      </div>;

const styles = {
  container: {
    minHeight: 'min-content',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  markdown: {
    overflow: 'hidden',
    backgroundColor: 'white',
    minHeight: '50%',
    padding: '16px',
    width: '512px',
    maxWidth: '100%',
    marginTop: '32px',
  },
};

export default graphql(
  gql`
    query getPost($id: ID) {
      Post(id: $id) {
        id
        title
        body
      }
    }
  `,
  {
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }
)(Post);
