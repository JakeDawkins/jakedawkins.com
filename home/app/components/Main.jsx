var React = require('react');
let {Grid, Row, Col} = require('react-bootstrap');
let Header = require('Header');
let Nav = require('Nav');
let Footer = require('Footer');

var Main = React.createClass({

    render: function() {
        return (
            <div>
                <Header />
                <Nav />
                <Grid>
                    {this.props.children}
                </Grid>
                <Footer />
            </div>
        );
    }

});

module.exports = Main;
