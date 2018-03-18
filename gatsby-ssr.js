// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// // import { AppRegistry } from 'react-native';
// import { StyleSheet } from 'react-primitives';

// exports.replaceRenderer = ({
//   bodyComponent,
//   replaceBodyHTMLString,
//   setHeadComponents,
// }) => {
//   class App extends React.Component {
//     render() {
//       return bodyComponent;
//     }
//   }

//   // See https://github.com/necolas/react-native-web/blob/master/website/guides/getting-started.md#server-side-rendering
//   // AppRegistry.registerComponent('App', () => App);
//   // const { element, getStyleElement } = AppRegistry.getApplication('App');

//   const html = ReactDOMServer.renderToString(bodyComponent);
//   // const styleElement = getStyleElement();
//   const styles = StyleSheet.renderToString(); // return styles

//   replaceBodyHTMLString(html);
//   setHeadComponents([styles]);
// };
