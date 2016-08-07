var React = require('react');
var PropTypes = React.PropTypes;
let {Grid, Row, Col} = require('react-bootstrap');

var Footer = React.createClass({

    render: function() {
        return (
            <footer>
                <Grid>
                    <p className="text-muted text-center">&copy;2016 Jake Dawkins</p>
                </Grid>
            </footer>
        );
    }

});

module.exports = Footer;
