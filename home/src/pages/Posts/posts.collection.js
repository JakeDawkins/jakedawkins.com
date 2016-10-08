import React, { Component } from "react";

import SVGIcons from "../../components/SVGIcons";
import PersonHeader from "../../components/PersonHeader";
import Footer from "../../components/Footer";
import PostList from "../../components/PostList";

import data from "../../api/data.js"; //for person header

class PostCollection extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render(){
    return (
      <div style={{height:"100%"}}>
        <SVGIcons />

        <PersonHeader
          userDisplayName={data.user.name}
          userDescription={data.user.user_description}
          userEmail={data.user.email}
          userTwitter={data.user.twitter_username}
          userGithub={data.user.github_username}
        />

        <PostList posts={data.posts} />

        <Footer />
      </div>
    )
  }

}

export default PostCollection;
