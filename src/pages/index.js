import React from 'react';
import Link from 'gatsby-link';
import { View, Text } from 'react-primitives';

import Heading from '../components/heading';
import Badge from '../components/badge';
import ContentItem from '../components/content-item-row';
import SmartLink from '../components/link';

import siteData from '../info';

const sortByDate = (a, b) => {
  if (b.node.frontmatter.date > a.node.frontmatter.date) return 1;
  if (a.node.frontmatter.date > b.node.frontmatter.date) return -1;
  return 0;
};

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
    .sort(sortByDate)
    .map(p => ({ ...p.node.frontmatter, slug: p.node.fields.slug }));

  const writing = posts.filter(({ type, hide }) => type === 'WRITING' && !hide);
  const speaking = posts.filter(
    ({ type, hide }) => type === 'SPEAKING' && !hide,
  );

  const socialAccounts = siteData.socialAccounts;

  return (
    <View>
      <Heading text={siteData.title} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {socialAccounts.map((a, i, all) => (
          <SmartLink
            to={a.url}
            style={{ textDecoration: 'none' }}
            target="_blank"
          >
            <Badge
              leftText={a.siteName}
              rightText={a.handle}
              rightColor={a.color}
              style={{ marginRight: i !== all.length - 1 ? 8 : 0 }}
            />
          </SmartLink>
        ))}
      </View>

      <Text style={{ marginTop: 16, fontSize: 16 }}>{siteData.bio}</Text>

      <Heading level={2} text="Writing" style={{ marginTop: 32 }} />

      {writing.map(({ title, description, linkTitle, link, slug }) => (
        <ContentItem
          title={title}
          description={description}
          readMoreTitle={linkTitle ? linkTitle : 'Read More'}
          readMoreUrl={link ? link : slug}
          style={{ marginTop: 32 }}
        />
      ))}

      <Heading level={2} text="Speaking" style={{ marginTop: 32 }} />
      {speaking.map(({ title, description, linkTitle, link, slu }) => (
        <ContentItem
          title={title}
          description={description}
          readMoreTitle={linkTitle ? linkTitle : 'Read More'}
          readMoreUrl={link ? link : slug}
          style={{ marginTop: 32 }}
        />
      ))}
    </View>
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
