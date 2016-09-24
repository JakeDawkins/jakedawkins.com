let React = require('react');
let PropTypes = React.PropTypes;
let {Grid, Row, Col} = require('react-bootstrap');
let data = require('data');
let brand = data.brand;

const Header = () => (
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

module.exports = Header;
