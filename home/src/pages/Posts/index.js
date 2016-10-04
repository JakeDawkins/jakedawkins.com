import React from "react";

import SinglePost from "./posts.single";
import PostCollection from "./posts.collection";

import data from "../../api/data.js";

const Posts = (props) => {
  if (props.location.query.id) return <SinglePost post={data.posts[props.location.query.id]} />
  else return <PostCollection {...props} />
}

export default Posts;

// <Header header="Jake Dawkins" subheader="Web Developer"/>
// <PostHeader dateTime={Date.now()} title={sampleProps.title} description={sampleProps.description} />


//
