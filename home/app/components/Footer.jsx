var React = require('react');
var PropTypes = React.PropTypes;
let {Grid, Row, Col} = require('react-bootstrap');

var Footer = React.createClass({

    render: function() {
        return (
            <footer>
                <Grid>
                    <Col md={8} mdOffset={2} sm={12} xs={12} className="hard">
                        <hr />
                        <p className="text-muted text-center">&copy;2016 Jake Dawkins</p>
                    </Col>
                </Grid>
            </footer>
        );
    }

});

module.exports = Footer;
