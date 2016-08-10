var React = require('react');
let {Grid, Row, Col} = require('react-bootstrap');
let {Link} = require('react-router');

var Project = React.createClass({

    render: function() {
        let {id, title, description, tags, date} = this.props;

        return (
            <Row>
                <Col md={8} mdOffset={2}>
                    <Link to={`/programming/project/${id}`}>
                        <h3>{title}</h3>
                    </Link>
                    <p>
                        {description}<br /><br />
                        {tags}<br />
                        {date}
                    </p>
                    <hr />
                </Col>
            </Row>
        );
    }

});

module.exports = Project;
