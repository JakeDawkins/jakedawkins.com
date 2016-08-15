var React = require('react');
let {Grid, Row, Col} = require('react-bootstrap');
let {Link} = require('react-router');

var Project = React.createClass({

    render: function() {
        let {id, title, description, tags, date, directLink} = this.props;
        let renderTitle = () => {
            if(directLink == '')
                return (
                    <Link to={`/programming/project/${id}`}>
                        <h3>{title}</h3>
                    </Link>
                )
            else
                return (
                    <a href={directLink}>
                        <h3>{title} &nbsp;<i className="fa fa-link" aria-hidden="true"></i></h3>
                    </a>
            )
        }

        return (
            <Row>
                <Col md={8} mdOffset={2} sm={12} xs={12}>
                    {renderTitle()}
                    <p>
                        {description}<br /><br />
                        <small>{tags}<br />
                        {date}</small>
                    </p>
                    <hr />
                </Col>
            </Row>
        );
    }

});

module.exports = Project;
