# jakedawkins.com

My personal website, built using [Gatsby](https://www.gatsbyjs.org). Styled to look similar to GitHub Markdown.

## Uses

* [react-primitives](https://github.com/lelandrichardson/react-primitives)
* [gatsby-react-native-web](https://github.com/slorber/gatsby-plugin-react-native-web) - copied the code in `gatsby-browser`, `gatsby-node`, and `gatsby-ssr` files.
* [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) - post styling

---

## Run locally

requires gatsby cli

```
git clone https://github.com/JakeDawkins/jakedawkins.com.git
cd jakedawkins.com
gatsby develop
```

---

## Deploy

Assumes you're deploying to github pages. You will need to change the path prefix to match your repository name. More information [here](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/).

```
yarn deploy
```
