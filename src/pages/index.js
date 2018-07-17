import React from 'react';
import styled, { css } from 'react-emotion';

import { Rule, Badge, ContentItemRow, Link } from '../components';
import siteData from '../info';

const sortByDate = (a, b) => {
  if (b.node.frontmatter.date > a.node.frontmatter.date) return 1;
  if (a.node.frontmatter.date > b.node.frontmatter.date) return -1;
  return 0;
};

const SocialWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

const Bio = styled.p({ marginTop: 16, fontSize: 16 });
const SiteTitle = styled.h1({ fontWeight: 600 });
const SectionTitle = styled.h2({ marginTop: 32, fontWeight: 600 });

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

  const socialAccounts = siteData.socialAccounts;

  return (
    <div>
      <SiteTitle>{siteData.title}</SiteTitle>
      <Rule />

      <SocialWrapper>
        {socialAccounts.map((a, i, all) => (
          <Link
            key={a.url}
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
          </Link>
        ))}
      </SocialWrapper>

      {siteData.bio.map((paragraph, i) => <Bio key={i}>{paragraph}</Bio>)}

      <SectionTitle>Writing</SectionTitle>
      <Rule />

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
      <Rule />

      {speaking.map(({ title, description, linkTitle, link, slu }) => (
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
