import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import "./author.scss";

class Author extends Component {

  static propTypes = {
    userDisplayName: PropTypes.string,
    userImageUrl: PropTypes.string,
    userDescription: PropTypes.string,
    userEmail: PropTypes.string,
  }

  render() {
    return(
      <section className="author" itemProp="author">
          <div className="details" itemScope itemType="http://schema.org/Person">
              <img itemProp="image" className="img-rounded" src={this.props.userImageUrl} alt={this.props.userDisplayName} />
              <p className="def">Author</p>
              <h3 className="name">
                  <Link itemProp="name" to="/about">{this.props.userDisplayName}</Link>
              </h3>
              <p className="desc">{this.props.userDescription}</p>
              <a itemProp="email" className="email" href={`mailto:${this.props.userEmail}`}>{this.props.userEmail}</a>
          </div>
      </section>
    );
  }
}

export default Author;
