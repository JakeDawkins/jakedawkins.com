module.exports = {
  siteMetadata: {
    title: 'Jake Dawkins',
  },
  plugins: [
    `gatsby-plugin-react-next`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-graphcms`,
      options: {
        endpoint: `https://api.graphcms.com/simple/v1/cj5tn2xagdqe30122bgt8ds9x`,
        token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDIyNDg3MTksImNsaWVudElkIjoiY2l2Z29zNmNqMDE5MjAxODRucDAxZGRkMiIsInByb2plY3RJZCI6ImNqNXRuMnhhZ2RxZTMwMTIyYmd0OGRzOXgiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqNjRnM21hZ2ptY2owMTYwZmZoc2J1ZTkifQ.8Pz9fdUcjqRVxmwwqq_dc0AQU9MLPswca1rdJRFxFBA`,
        query: `
        {
          allPosts {
            title
            id
            # body
            externalLink
            linkTitle
            type
            description
            publishDate
          }
          allSites {
            id
            bio
            title
          }
          allSocialAccounts {
            id
            color
            handle
            siteName
            url
          }
        }
        `,
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: './src/assets/favicon.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false,
        },
      },
    },
  ],
};
