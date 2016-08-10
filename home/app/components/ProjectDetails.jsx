var React = require('react');
let {Grid, Row, Col} = require('react-bootstrap');

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

var ProjectDetails = React.createClass({

    render: function() {
        let id = this.props.params.id;
        let project = projects[id-1];
        return (
            <Row>
                <Col md={8} mdOffset={2}>
                    <h1>{project.title}</h1>
                    <p>
                        {project.date}<br /><br />
                        {project.tags}<br /><br />
                        {project.description}
                    </p>
                </Col>
            </Row>
        );
    }

});

module.exports = ProjectDetails;
