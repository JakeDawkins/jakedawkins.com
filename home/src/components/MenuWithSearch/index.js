import React, { Component } from "react";

// XXX leaving as class because I want ot load the links dynamic

class MenuWithSearch extends Component {
  render(){
    return(
      <div>
        <div className="search-wrapper">
          <div className="search-form">
            <input type="text" className="search-field" placeholder="Search..." />
            <svg className="icon-remove-sign"><use xlinkHref="#icon-close"></use></svg>
            <ul className="search-results search-list"></ul>
          </div>
        </div>
        <div id="fade" className="overlay"></div>
        <a id="slide" className="slideButton fade">
          <svg id="open" className="icon-menu"><use xlinkHref="#icon-menu"></use></svg>
          <svg id="close" className="icon-menu"><use xlinkHref="#icon-close"></use></svg>
        </a>
        <aside id="sidebar">
        <nav id="navigation">
          <h2>MENU</h2>
          <ul>
            <li><a href="#">Link Title</a></li>
            <li><a href="#">Link Title</a></li>
            <li><a href="#">Link Title</a></li>
          </ul>
        </nav>
        </aside>
        <a id="search" className="dosearch">
          <svg className="icon-menu icon-search"><use xlinkHref="#icon-search"></use></svg>
        </a>
      </div>
    );
  }
}

export default MenuWithSearch;
