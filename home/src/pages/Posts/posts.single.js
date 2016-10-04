import React from "react";
import SVGIcons from "../../components/SVGIcons";
import Footer from "../../components/Footer";

import Post from "../../components/Post";
import PostHeader from "../../components/PostHeader";

const SinglePost = (props) => {
  const { content, title, description, publishedDateTime } = props.post;
  console.log(publishedDateTime);
  console.log(props.post);
  return (
    <div style={{height:"100%"}}>
      <SVGIcons />

      <PostHeader title={title} description={description} dateTime={publishedDateTime}/>

      <Post markdown={content} />

      <Footer />
    </div>
  );
}

export default SinglePost;
