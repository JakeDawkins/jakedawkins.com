var React = require('react');
let {Grid, Row, Col} = require('react-bootstrap');
let Project = require('Project');

let projects = [
    {
        id: 1,
        title: "Test Project",
        description: "This is a description of the project. There are many things that can be done here discussing the project but sometimes you need to link to the project for",
        tags: "#tag1 #tag2 #tag3",
        date: "8/9/2016"
    },{
        id: 2,
        title: "Test2",
        description: "This is a description of the project. There are many things that can be done here discussing the project but sometimes you need to link to the project for",
        tags: "#tag1",
        date: "8/8/2016"
    },{
        id: 3,
        title: "Tester 3",
        description: "This is a description of the project. There are many things that can be done here discussing the project but sometimes you need to link to the project for",
        tags: "#tag1 #tag2",
        date: "8/7/2016"
    }
];

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
