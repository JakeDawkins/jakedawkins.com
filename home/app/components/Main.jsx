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
                    <Row>
                        <Col md={8} mdOffset={2}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
                <Footer />
            </div>
        );
    }

});

module.exports = Main;
