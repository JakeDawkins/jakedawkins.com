import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

// XXX remove
import data from "../../api/data.js";

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
              <img itemProp="image" className="img-rounded" src={data.user.image} alt={data.user.name} />
              <p className="def">Author</p>
              <h3 className="name">
                  <Link itemProp="name" to="/about">{data.user.name}</Link>
              </h3>
              <p className="desc">{data.user.user_description}</p>
              <a itemProp="email" className="email" href="mailto:{data.user.email}">{data.user.email}</a>
          </div>
      </section>
    );
  }
}

export default Author;
