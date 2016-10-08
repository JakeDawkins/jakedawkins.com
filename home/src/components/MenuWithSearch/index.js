import React, { Component, PropTypes } from "react";
import "./menuWithSearch.scss"
import { Link } from "react-router";

// XXX Can I move all aside styles here?

class MenuWithSearch extends Component {

  // Links unused currently
  static propTypes = {
    slide: PropTypes.bool,
    links: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      slide: props.slide || false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
    console.log("toggle to ", !this.state.slide);
    this.setState({
      slide: !this.state.slide
    });
    //#sidebar add class slide
  }

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
        <div id="fade" className={this.state.slide ? "overlay slide" : "overlay"} onClick={this.toggleMenu}></div>
        <a id="slide" className={this.state.slide ? "slideButton fade slide" : "slideButton fade"}>
          <svg
            id="open"
            className="icon-menu"
            onClick={this.toggleMenu}
            style={this.state.slide ? {display:"none"} : {display: "inline"}}
          ><use xlinkHref="#icon-menu"></use></svg>
          <svg
            id="close"
            className="icon-menu"
            onClick={this.toggleMenu}
            style={this.state.slide ? {display:"inline"} : {display: "none"}}
          ><use xlinkHref="#icon-close"></use></svg>
        </a>
        <aside id="sidebar" className={this.state.slide ? "slide" : ""}>
        <nav id="navigation">
          <h2>MENU</h2>
          <ul>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        </aside>
        {/*
        <a id="search" className="dosearch">
          <svg className="icon-menu icon-search"><use xlinkHref="#icon-search"></use></svg>
        </a>
        */}
      </div>
    );
  }
}

export default MenuWithSearch;
