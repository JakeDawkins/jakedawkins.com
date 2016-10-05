import React, { PropTypes } from "react";
import "./footer.scss";

const Footer = (props) =>
  <footer style={props.collapseMargins ? {marginTop: 0} : null}>
    <p>&copy;2016 Jake Dawkins. Based off theme by <a href="https://willianjusten.com.br">Willian Justen</a></p>
  </footer>

Footer.propTypes = {
    collapseMargins: PropTypes.bool,
}

export default Footer;
