var React = require('react');
let {Grid, Row, Col} = require('react-bootstrap');
let data = require('data');
let projects = data.projects;

var ProjectDetails = React.createClass({

    render: function() {
        let id = this.props.params.id;
        let project = projects[id];

        var renderImages = () => {
            let index = 0;
            return project.images.map((image) => {
                 return (
                    <a key={index++} href={image}><img className="img-responsive col-lg-4 col-md-4 col-xs-6" style={{paddingLeft: 0}} src={image} /></a>
                 )
            });
        };

        var renderAddlSection = () => {
            if(project.addlSectionTitle){
                return (<div>
                    <h3>{project.addlSectionTitle}</h3>
                    <div dangerouslySetInnerHTML={{__html: project.addlSectionContent}} />
                </div>)
            }
        };

        return (
            <Row>
                <Col md={8} mdOffset={2}>
                    <h1>{project.title}</h1>
                    <p>
                        {project.date}<br />
                        <em>{project.tags}</em>
                    </p>
                    <p><a className="btn btn-primary" href={project.repoLink}>{project.repoTitle}</a></p>
                    <div dangerouslySetInnerHTML={{__html: project.htmlDescription}}></div>
                    <hr />
                    {renderAddlSection()}
                    <hr />
                    <h3>{project.imageSectionTitle}</h3>
                    {renderImages()}
                </Col>
            </Row>
        );
    }

});

module.exports = ProjectDetails;
