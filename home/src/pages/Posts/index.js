import React, { Component } from "react";

import SinglePost from "./posts.single";
import PostCollection from "./posts.collection";

import data from "../../api/data.js";

class Posts extends Component {

  render(){
    if (this.props.location.query.id) return <SinglePost post={data.posts[this.props.location.query.id]} />
    else return <PostCollection {...this.props} />
  }

}

export default Posts;

// <Header header="Jake Dawkins" subheader="Web Developer"/>
// <PostHeader dateTime={Date.now()} title={sampleProps.title} description={sampleProps.description} />
