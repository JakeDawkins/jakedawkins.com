let React = require('react');
let {Grid, Row, Col} = require('react-bootstrap');
let {Link} = require('react-router');

class Project extends React.Component {

  renderTitle() {
    if(this.props.directLink == '')
      return (
        <Link to={`/programming/project/${this.props.id}`}>
          <h3>{this.props.title}</h3>
        </Link>
      );
    else
      return (
        <a href={this.props.directLink}>
          <h3>{this.props.title} &nbsp;<i className="fa fa-link" aria-hidden="true"></i></h3>
        </a>
      );
  }

  render() {
    return (
      <Row>
        <Col md={12} sm={12} xs={12}>
          {this.renderTitle()}
          <p>
            {this.props.description}<br /><br />
            <small>{this.props.tags}<br />
            {this.props.date}</small>
          </p>
          <hr />
        </Col>
      </Row>
    );
  }

}

module.exports = Project;
