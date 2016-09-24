let React = require('react');
let {Grid, Row, Col} = require('react-bootstrap');
let Header = require('Header');
let Nav = require('Nav');
let Footer = require('Footer');

const Main = (props) => (
  <div>
    <Header />
    <Nav />
    <Grid>
      {props.children}
    </Grid>
    <Footer />
  </div>
);

module.exports = Main;
