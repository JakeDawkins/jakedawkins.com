var React = require('react');
let {Grid, Row, Col} = require('react-bootstrap');
let data = require('data');
let aboutData = data.about;

var About = React.createClass({

    render: function() {
        let renderSocial = () => {
            return aboutData.social.map((social) => {
                    return (
                        <li key={social.title}>
                            <a href={social.link}>
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className={social.iconClasses}></i>
                                </span>
                            </a>
                        </li>
                    )
            })
        }
        return (
            <div>
                <Col md={8} mdOffset={2} sm={12} xs={12}>
                    <Col md={4} sm={12} xs={12} className="text-center">
                        <img className="img-rounded img-responsive" src={aboutData.image}/>
                    </Col>
                    <Col md={8} sm={12} xs={12} dangerouslySetInnerHTML={{__html: aboutData.markup}}>
                    </Col>
                </Col>
                <Col md={8} mdOffset={2} sm={12} xs={12}>
                    <ul className="list-inline text-center">
                        {renderSocial()}
                    </ul>
                </Col>
            </div>
        );
    }
});

module.exports = About;
