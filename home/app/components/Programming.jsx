var React = require('react');
let {Grid, Row, Col} = require('react-bootstrap');
let Project = require('Project');
let data = require('data');
let projects = data.projects;

var Programming = React.createClass({
    render: function() {
        let renderProjects = () => {
            return projects.map((project) => {
                 return (
                     //key -> all repeated components need unique
                     //{...todo} spread operator, send all children as props
                     <Project key={project.id} {...project}/>
                 )
            });
        };

        return (
            <div>
                <Row>
                    <Col md={8} mdOffset={2} className="text-center">
                        <h1>Programming Projects</h1>
                        <hr style={{width: '25%'}} />
                    </Col>

                </Row>
                {renderProjects()}
            </div>
        );
    }

});

module.exports = Programming;
