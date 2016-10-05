import React, { Component } from "react";

import SVGIcons from "../../components/SVGIcons";
import Footer from "../../components/Footer";

import Post from "../../components/Post";
import PostHeader from "../../components/PostHeader";

class SinglePost extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render(){
    const { content, title, description, publishedDateTime } = this.props.post;
    return (
      <div style={{height:"100%"}}>
        <SVGIcons />

        <PostHeader title={title} description={description} dateTime={publishedDateTime}/>

        <Post markdown={content} />

        <Footer collapseMargins={true} />
      </div>
    );
  }

}

export default SinglePost;
