# JakeDawkins.com

## 🌎 Check out my site at [jakedawkins.com](https://jakedawkins.com)

My personal website, built using [Gatsby](https://www.gatsbyjs.org). Styled to look similar to the GitHub Markdown preview.

## Uses

* [Emotion](https://emotion.sh) for styling
* [gatsby-plugin-favicon](https://github.com/Creatiwity/gatsby-plugin-favicon) to generate the site's various favicons
* [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) - post styling

---

## To run locally...

Install the [Gatsy CLI](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-cli)

```
git clone https://github.com/JakeDawkins/jakedawkins.com.git
cd jakedawkins.com
yarn
gatsby develop
```

---

## Deploy

Assuming you're deploying to github pages, You will need to have this repository set up with your own GitHub repository, and have write privileges.

You will need to change the CNAME file generation in the deploy script to match your url.

`package.json > scripts > deploy`

With both of those steps done, deploying is as easy as running `yarn deploy`
