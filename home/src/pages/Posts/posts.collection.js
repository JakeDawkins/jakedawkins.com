import React, { Component } from "react";

import SVGIcons from "../../components/SVGIcons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostList from "../../components/PostList";

import data from "../../api/data.js";

class PostCollection extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render(){
    return (
      <div style={{height:"100%"}}>
        <SVGIcons />

        <Header
          header="Jake Dawkins"
          subheader="Web Developer"
          email={`mailto:${data.user.email}`}
          twitter={`https://twitter.com/${data.user.twitter_username}`}
          github={`https://github.com/${data.user.github_username}`} />

        <PostList posts={data.posts} />

        <Footer />
      </div>
    )
  }

}

export default PostCollection;
