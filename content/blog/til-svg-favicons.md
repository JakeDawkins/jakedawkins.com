---
external: false
title: 'TIL: SVG Favicons'
description: 'I learned favicons are a more complicated topic than I expected!'
date: 2025-01-29
---

## TIL favicons are more complicated than I knew.

- You CAN use SVGs for favicons [more info in this blog post](<[text](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/)>)
- Favicons CAN also use PNGs
- Support for SVGs is mixed

SVG favicons, for example, are still not supported in Apple's Safari on mobile or desktop.
For that, you'll need to fall back to a png favicon (which is supported by both).

Because HTML is flexible, you can still define both the newer svg and older png favicon,
and if svgs are supported, the browser will use that, and if not, the PNG favicon will be used

```html
<meta name="theme-color" content="#ffffff" />
<link rel="icon" href="/favicon.png" sizes="any" />
<link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/manifest.json" />
```

## Resources

- [PNG Favicon support](https://caniuse.com/link-icon-png)
- [SVG Favicon support](https://caniuse.com/link-icon-svg)
- [Guide on setting up favicons](https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7)
- [Favicon checker](https://realfavicongenerator.net/favicon-checker)
