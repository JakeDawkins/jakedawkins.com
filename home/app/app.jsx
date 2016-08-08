var React = require('react');
var ReactDOM = require('react-dom');
//Object destructuring.
//same as var Route = require('react-router').Route etc...
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
let Main = require('Main');

let Alert = require('react-bootstrap').Alert;
let {Grid, Row, Col} = require('react-bootstrap');

//pages
let About = require('About');
let Programming = require('Programming');
let Photos = require('Photos');
let Contact = require('Contact');

// app css
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
          <IndexRoute component={About}/>
          <Route path="/programming" component={Programming} />
          <Route path="/photos" component={Photos} />
          <Route path="/contact" component={Contact} />
      </Route>
    </Router>,
    document.getElementById('app')
);
