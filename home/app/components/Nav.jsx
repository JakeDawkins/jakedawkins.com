var React = require('react');
var PropTypes = React.PropTypes;
let {Grid, Row, Col} = require('react-bootstrap');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({

    render: function() {
        return (
            <Grid>
                <Row>
                    <Col md={8} mdOffset={2} sm={12} xs={12}>
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
    }
});

module.exports = Nav;

/*
<li>
    <Link to="/photos" activeClassName="active"  activeStyle={{fontWeight: 'bold'}}>Photos</Link>
</li>
<li>
    <Link to="/contact" activeClassName="active"  activeStyle={{fontWeight: 'bold'}}>Contact</Link>
</li>
*/
