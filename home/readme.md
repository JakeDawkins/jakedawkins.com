# JakeDawkins.com

## Overview
This app uses react 0.14.7 for building the DOM and includes the Karma 0.13.22 testing suite. Uses react-bootstrap

## Install
1. Copy the repository
2. Run `npm i`

## Running
1. `webpack` to compile files
2. `node server.js` to access project at localhost:3000

## File Structure
```
.
├── app
│   ├── api
│   ├── app.jsx
│   ├── components
│   ├── styles
│   │   ├── app.scss
│   │   ├── base
│   │   │   └── _variables.scss
│   │   └── components
│   └── tests
│       ├── app.test.jsx
│       └── components
├── karma.conf.js
├── package.json
├── public
│   ├── bundle.js
│   └── index.html
├── readme.md
├── server.js
└── webpack.config.js
```


## Adding Components & Tests
Components are stored in the app/components folder. Tests for these components are in the app/test/components folder.

## Adding Styles
This project uses SCSS and stores the source files in app/styles. app/styles/app.scss is the base file with includes into components and base.
