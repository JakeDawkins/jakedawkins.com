import React from 'react';
import ReactDOM from 'react-dom';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';

import './app.css';
import registerServiceWorker from './registerServiceWorker';

import Background from './assets/bg.png';

import Home from './pages/home';
import Post from './pages/post';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.graphcms.com/simple/v1/cj5tn2xagdqe30122bgt8ds9x',
  }),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div style={styles.container}>
          <Route exact path="/" component={Home} />
          <Route path="/post/:id" component={Post} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

const styles = {
  container: {
    minHeight: 'min-content',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'repeat',
  },
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
