var React = require('react');
let {Grid, Row, Col} = require('react-bootstrap');

var About = React.createClass({

    render: function() {
        return (
            <div>
                <Col md={8} mdOffset={2}>
                    <Col md={4} className="text-center">
                        <img className="img-rounded" src="http://jakedawkins.com/img/selfportrait.png"/>
                    </Col>
                    <Col md={8}>
                        <p>
                            I'm Jake. I'm a Junior Web Developer at NewSpring Church in Anderson, SC.
                            I have a degree from Clemson University in Computer Science with a minor in Psychology.

                            <br /><br />

                            I have a passion for technology, and a knack for making things work.
                            I love making things for people to use. Real people.
                            Take a look around and feel free to sift through my work and photos.
                            For the truly ambitious, reach out to me!
                        </p>
                    </Col>
                </Col>

            </div>
        );
    }
});

module.exports = About;
