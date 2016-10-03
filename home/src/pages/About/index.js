import React from "react";

import SVGIcons from "../../components/SVGIcons";
// import Header from "../../components/Header";
import PostHeader from "../../components/PostHeader";
import Footer from "../../components/Footer";
// import PostList from "../../components/PostList";
import Post from "../../components/Post";

const sampleProps = {
  title: "About Me",
  description: "I make things with a keyboard (and sometimes a mouse)",
  readMoreText: "Read more about Machine Learning Theory - Part 2: Generalization Bounds", //title ex: "read more..."
  tags: ["machine learning", "artificial intelligence", "statistics"],
}
const about = "## Header\n\nThis is the content\n\ninclude some stuff here\n\nand here\n[]()";

const Posts = (props) =>
  <div style={{height:"100%"}}>
    <SVGIcons />

    <PostHeader title={sampleProps.title} description={sampleProps.description} />

    <Post markdown={about} />

    <Footer />
  </div>

export default Posts;

// <Header header="Jake Dawkins" subheader="Web Developer"/>
// <PostHeader dateTime={Date.now()} title={sampleProps.title} description={sampleProps.description} />
