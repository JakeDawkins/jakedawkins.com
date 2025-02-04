---
external: false
title: 'TIL: NPM Legacy Peer Dependencies'
description: 'An easier route forward when upgrading dependencies and you run into peer dependency issues.'
date: 2025-02-05
---

## TIL NPM lets you bypass peer dependency checks when upgrading dependencies.

I was upgrading react from 18 to 19 today, and I ran into a lot of peer dependency issues.
Many of the packages I was using in this project are pinned to versions that have peer
dependencies including react 18.

To get around this, I just needed to run `npm i my-package@latest --legacy-peer-deps`
and it would install the updated package without running checks on all peer dependencies.

So my workflow looked a lot like:

1. Upgrade react to v19
1. `npm i` (resulting in a peer depdency error for `my-package` saying it needs `react@18` but found `react@19`)
1. `npm i my-package@latest --legacy-peer-deps`
1. `npm i` again, which usually found another peer package that needed to be updated, and so on.

When upgrading the package on step 2, I still needed to double check which verison
supported react 19, because if I was 3 major versions behind on a package, but a minor
version bump could get me to support, that's probably the easier route in the short-term.

For this, I just found the package's github repo and looked at the package.json file to
see which version of react it was dependent on.

## Resources

- [Heatware: npm –legacy-peer-deps: The Solution to Your Dependency Issues](https://www.heatware.net/tech-tips/npm-legacy-peer-deps-dependency/)
