import React from 'react';
import Markdown from 'react-markdown';
import { gql, graphql } from 'react-apollo';

import Header from '../components/header';
import Footer from '../components/footer';

export const Post = ({ data }) =>
  !data.loading &&
  <div style={styles.container}>
    <Header heading="Jake Dawkins" subHeading="I make dope stuff" />

    <div style={styles.markdown}>
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
  },
  markdown: {
    overflow: 'hidden',
    backgroundColor: 'white',
    minHeight: '50%',
    width: '100%',
    maxWidth: '512px',
    padding: '16px',
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
