var React = require('react');
var PropTypes = React.PropTypes;
let {Grid, Row, Col} = require('react-bootstrap');

var Nav = React.createClass({

    render: function() {
        return (
            <Grid>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <ul class="list-inline nav-list">
                            <li>About</li>
                            <li>Programming</li>
                            <li>Photos</li>
                            <li>Contact</li>
                        </ul>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = Nav;
