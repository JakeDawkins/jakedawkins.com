import React from 'react';
import Link from 'gatsby-link';
import styled, { css } from 'react-emotion';
import Rule from '../components/rule';
import Badge from '../components/badge';
import ContentItem from '../components/content-item-row';
import SmartLink from '../components/link';

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

const Bio = styled.p({
  marginTop: 16,
  fontSize: 16,
});

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
    <div>
      <h1 className={css({ fontWeight: 600 })}>{siteData.title}</h1>
      <Rule />

      <SocialWrapper>
        {socialAccounts.map((a, i, all) => (
          <SmartLink
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
          </SmartLink>
        ))}
      </SocialWrapper>

      {siteData.bio.map((paragraph, i) => <Bio key={i}>{paragraph}</Bio>)}

      <h2 className={css({ marginTop: 32, fontWeight: 600 })}>Writing</h2>
      <Rule />

      {writing.map(({ title, description, linkTitle, link, slug }) => (
        <ContentItem
          title={title}
          description={description}
          readMoreTitle={linkTitle ? linkTitle : 'Read More'}
          readMoreUrl={link ? link : slug}
          style={{ marginTop: 32 }}
          key={`${title}-${link}`}
        />
      ))}

      <h2 className={css({ marginTop: 32, fontWeight: 600 })}>Speaking</h2>
      <Rule />

      {speaking.map(({ title, description, linkTitle, link, slu }) => (
        <ContentItem
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
