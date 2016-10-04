import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

// import App from './components/App';
import About from "./pages/About";
// import NotFound from './components/NotFound';
import Posts from "./pages/Posts"

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" >
      <IndexRoute component={Posts} />
      <Route path="about" component={About} />
    </Route>
  </Router>
);

export default Routes;

// <Route path="*" component={NotFound} />
