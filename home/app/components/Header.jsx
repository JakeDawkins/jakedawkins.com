var React = require('react');
var PropTypes = React.PropTypes;
let {Grid, Row, Col} = require('react-bootstrap');
let data = require('data');
let brand = data.brand;

var Header = React.createClass({

    render: function() {
        return (
            <Grid>
                <Row className="brand">
                    <Col md={12} sm={12} xs={12}>
                        <p>
                            <img class="brand-img" src={brand.image} width="64px"/>
                        </p>
                    </Col>
                </Row>
            </Grid>
        );
    }

});

module.exports = Header;
