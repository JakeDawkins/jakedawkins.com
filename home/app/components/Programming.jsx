let React = require('react');
let {Grid, Row, Col} = require('react-bootstrap');
let Project = require('Project');
let data = require('data');
let projects = data.projects;

class Programming extends React.Component {

  renderProjects() {
    return projects.map((project) => {
      return (
        <Project key={project.id} {...project}/>
      )
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col md={12} sm={12} xs={12} className="text-center">
            <h1>Programming Projects</h1>
            <hr style={{width: '25%'}} />
          </Col>
        </Row>
        {this.renderProjects()}
      </div>
    );
  }

}

module.exports = Programming;
