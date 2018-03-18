import React from 'react';
import Link from 'gatsby-link';
import { View, Text } from 'react-primitives';

import Heading from '../components/heading';
import Badge from '../components/badge';
import ContentItem from '../components/content-item-row';

const sortByDate = (a, b) => {
  if (b.node.publishDate > a.node.publishDate) return 1;
  if (a.node.publishDate > b.node.publishDate) return -1;
  return 0;
};

const IndexPage = ({ data }) => {
  const site = data.allSites.edges[0].node;
  const posts = data.allPosts.edges
    .filter(({ node }) => !!node.publishDate)
    .sort(sortByDate)
    .map(p => ({ ...p.node }));

  const writing = posts.filter(({ type }) => type === 'WRITING');
  const speaking = posts.filter(({ type }) => type === 'SPEAKING');

  const socialAccounts = data.allSocialAccounts.edges.map(a => ({ ...a.node }));

  return (
    <View>
      <Heading text={site.title} />
      <View style={{ flexDirection: 'row' }}>
        {socialAccounts.map((a, i) => (
          <a href={a.url} style={{ textDecoration: 'none' }} target="_blank">
            <Badge
              leftText={a.siteName}
              rightText={a.handle}
              rightColor={a.color}
              style={{ marginLeft: i !== 0 ? 8 : 0 }}
            />
          </a>
        ))}
      </View>

      <Text style={{ marginTop: 16, fontSize: 18 }}>{site.bio}</Text>

      <Heading level={2} text="Writing" style={{ marginTop: 32 }} />

      {writing.map(({ title, description, linkTitle, externalLink }) => (
        <ContentItem
          title={title}
          description={description}
          readMoreTitle={linkTitle ? linkTitle : 'Read More'}
          readMoreUrl={externalLink}
          style={{ marginTop: 32 }}
        />
      ))}

      <Heading level={2} text="Speaking" style={{ marginTop: 32 }} />
      {speaking.map(({ title, description, linkTitle, externalLink }) => (
        <ContentItem
          title={title}
          description={description}
          readMoreTitle={linkTitle ? linkTitle : 'Read More'}
          readMoreUrl={externalLink}
          style={{ marginTop: 32 }}
        />
      ))}
    </View>
  );
};

export const query = graphql`
  query IndexQuery {
    allPosts {
      edges {
        node {
          title
          id
          externalLink
          linkTitle
          type
          description
          publishDate
        }
      }
    }
    allSites {
      edges {
        node {
          bio
          title
        }
      }
    }
    allSocialAccounts {
      edges {
        node {
          color
          handle
          siteName
          url
        }
      }
    }
  }
`;

export default IndexPage;
