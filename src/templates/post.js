import React from 'react';
import 'github-markdown-css';
import { graphql } from 'gatsby';
import { Layout } from '../components';

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout atHomePage={false}>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
