import React from "react";

import SVGIcons from "../../components/SVGIcons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostList from "../../components/PostList";

import data from "../../api/data.js";

const Posts = (props) =>
  <div style={{height:"100%"}}>
    <SVGIcons />

    <Header header="Jake Dawkins" subheader="Web Developer"/>

    <PostList posts={data.posts} />

    <Footer />
  </div>

export default Posts;

// <Header header="Jake Dawkins" subheader="Web Developer"/>
// <PostHeader dateTime={Date.now()} title={sampleProps.title} description={sampleProps.description} />
