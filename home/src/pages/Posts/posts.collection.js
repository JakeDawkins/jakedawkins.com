import React from "react";

import SVGIcons from "../../components/SVGIcons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostList from "../../components/PostList";

import data from "../../api/data.js";

const PostCollection = (props) =>
  <div style={{height:"100%"}}>
    <SVGIcons />

    <Header header="Jake Dawkins" subheader="Web Developer"/>

    <PostList posts={data.posts} />

    <Footer />
  </div>

export default PostCollection;
