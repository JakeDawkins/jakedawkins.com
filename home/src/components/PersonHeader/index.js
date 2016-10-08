import React, { PropTypes } from "react";
import "./header.scss";
import { Link } from "react-router";

import MenuWithSearch from "../MenuWithSearch";

const PersonHeader = (props) => (
  <header className="header-site" role="banner">
    <div className="content">
      <h1>
        <span className="site-title">{props.userDisplayName}</span>
        <span className="site-description">{props.userDescription}</span>
      </h1>
      <div className="icons-home">
        <a aria-label="Send email" href={`mailto:${props.userEmail}`}>
          <svg className="icon icon-email">
            <use xlinkHref="#icon-email"></use>
          </svg>
        </a>
        <a aria-label="My Twitter" target="_blank" href={`https://twitter.com/${props.userTwitter}`}>
          <svg className="icon icon-twitter">
            <use xlinkHref="#icon-twitter"></use>
          </svg>
        </a>
        <a aria-label="My Github" target="_blank" href={`https://github.com/${props.userGithub}`} >
          <svg className="icon icon-github-alt">
            <use xlinkHref="#icon-github-alt"></use>
          </svg>
        </a>
      </div>
      <div>
        <Link to="/about?id=1" style={{textDecoration: "none"}}>
          <br /><br />
          <h2>About Me</h2>
        </Link>
      </div>
    </div>
    <a role="button" className="down" data-scroll href="#scroll"><svg className="icon icon-angle-down"><use xlinkHref="#icon-angle-down"></use></svg></a>
    <MenuWithSearch />
  </header>
);

PersonHeader.propTypes = {
  userDisplayName: PropTypes.string,
  userDescription: PropTypes.string,
  userEmail: PropTypes.string,
  userTwitter: PropTypes.string,
  userGithub: PropTypes.string,
};

export default PersonHeader;
