import React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';

import { ContentItemRow, Layout } from '../components';

const sortByDate = (a, b) => {
  if (b.node.frontmatter.date > a.node.frontmatter.date) return 1;
  if (a.node.frontmatter.date > b.node.frontmatter.date) return -1;
  return 0;
};

const SectionTitle = styled.h2({
  marginTop: '32px',
  fontWeight: 900,
  fontFamily: 'Merriweather',
  fontSize: '32px',
});

const IndexPage = ({ data }) => {
  // reduce the posts from the returned data
  const posts = data.allMarkdownRemark.edges
    .sort(sortByDate)
    .map(p => ({ ...p.node.frontmatter, slug: p.node.fields.slug }));

  // filter posts by writing/speaking posts
  const writing = posts.filter(({ type, hide }) => type === 'WRITING' && !hide);
  const speaking = posts.filter(
    ({ type, hide }) => type === 'SPEAKING' && !hide,
  );

  return (
    <Layout>
      <div>
        <SectionTitle>Writing</SectionTitle>
        {writing.map(({ title, description, linkTitle, link, slug }) => (
          <ContentItemRow
            title={title}
            description={description}
            readMoreTitle={linkTitle ? linkTitle : 'Read More'}
            readMoreUrl={link ? link : slug}
            style={{ marginTop: 32 }}
            key={`${title}-${link}`}
          />
        ))}

        <SectionTitle>Speaking</SectionTitle>
        {speaking.map(({ title, description, linkTitle, link, slug }) => (
          <ContentItemRow
            title={title}
            description={description}
            readMoreTitle={linkTitle ? linkTitle : 'Read More'}
            readMoreUrl={link ? link : slug}
            style={{ marginTop: 32 }}
            key={`${title}-${link}`}
          />
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            description
            link
            linkTitle
            date
            type
            hide
          }
          timeToRead
          html
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default IndexPage;
