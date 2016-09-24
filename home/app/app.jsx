let React = require('react');
let ReactDOM = require('react-dom');
//Object destructuring.
//same as let Route = require('react-router').Route etc...
let {Route, Router, IndexRoute, hashHistory} = require('react-router');
let Main = require('Main');

let Alert = require('react-bootstrap').Alert;
let {Grid, Row, Col} = require('react-bootstrap');

//pages
let About = require('About');
let Programming = require('Programming');
let Photos = require('Photos');
let Contact = require('Contact');
let ProjectDetails = require('ProjectDetails');

// app css
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
          <IndexRoute component={About}/>
          <Route path="programming" component={Programming}/>
          <Route path="programming/project/:id" component={ProjectDetails}/>
          <Route path="photos" component={Photos} />
          <Route path="contact" component={Contact} />
      </Route>
    </Router>,
    document.getElementById('app')
);
