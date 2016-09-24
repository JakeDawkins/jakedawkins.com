let React = require('react');
let PropTypes = React.PropTypes;
let {Grid, Row, Col} = require('react-bootstrap');

let Footer = React.createClass({

    render: function() {
        return (
            <footer>
                <Grid>
                    <Col md={12} sm={12} xs={12} className="hard">
                        <p className="text-muted text-center">&copy;2016 Jake Dawkins</p>
                    </Col>
                </Grid>
            </footer>
        );
    }

});

module.exports = Footer;
