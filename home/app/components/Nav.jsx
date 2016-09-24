let React = require('react');
let PropTypes = React.PropTypes;
let {Grid, Row, Col} = require('react-bootstrap');
let {Link, IndexLink} = require('react-router');

const Nav = () => (
  <Grid>
    <Row>
      <Col md={12} sm={12} xs={12}>
        <ul className="list-inline nav-list">
          <li>
            <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>About Me</IndexLink>
          </li>
          <li>
            <Link to="/programming" activeClassName="active"  activeStyle={{fontWeight: 'bold'}}>Programming</Link>
          </li>
        </ul>
        <hr />
      </Col>
    </Row>
  </Grid>
);

module.exports = Nav;
