import React, { PropTypes } from "react";
import ReactMarkdown from "react-markdown";
import "../../styles/_post.scss";

const Post = (props) =>
  <section className="post" itemScope itemType="http://schema.org/BlogPosting">
      <article role="article" id="scroll" className="post-content" itemProp="articleBody">
        <ReactMarkdown source={props.markdown} />
      </article>
  </section>

Post.propTypes = {
  markdown: PropTypes.string.isRequired
}

export default Post;
