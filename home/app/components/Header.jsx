var React = require('react');
var PropTypes = React.PropTypes;
let {Grid, Row, Col} = require('react-bootstrap');

var Header = React.createClass({

    render: function() {
        return (
            <Grid>
                <Row className="brand">
                    <Col md={8} mdOffset={2}>
                        <p>
                            <img class="brand-img" src="http://jakedawkins.com/img/new/brand-64b.png" width="64px"/>
                        </p>
                    </Col>
                </Row>
            </Grid>
        );
    }

});

module.exports = Header;
