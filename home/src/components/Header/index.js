import React from "react";
import "./header.scss";
import { Link } from "react-router";

import MenuWithSearch from "../MenuWithSearch";

const Header = (props) => (
  <header className="header-site" role="banner">
    <div className="content">
      <h1>
        <span className="site-title">{props.header}</span>
        <span className="site-description">{props.subheader}</span>
      </h1>
      <div className="icons-home">
        <a aria-label="Send email" href="#">
          <svg className="icon icon-email">
            <use xlinkHref="#icon-email"></use>
          </svg>
        </a>
        <a aria-label="My Twitter" target="_blank" href="#">
          <svg className="icon icon-twitter">
            <use xlinkHref="#icon-twitter"></use>
          </svg>
        </a>
        <a aria-label="My Github" target="_blank" href="#">
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

export default Header;

// <MenuWithSearch /> before closing header
