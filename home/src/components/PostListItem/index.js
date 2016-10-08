import React, { PropTypes } from "react";
import "./postListItem.scss";
import { Link } from "react-router";

let index = 0;

const renderTags = (tags) => {
  if (!tags.isArray) return;
  return tags.map(tag => {
    // return <a key={index++} href={`/categories/#${tag}`}>{tag}</a>
    return <span key={index++}>{tag}</span>
  });
}

const PostListItem = (props) =>
  <article role="article" className="post-item" itemScope="itemscope" itemType="http://schema.org/BlogPosting" itemProp="blogPost">
    <Link className="datetime" to={{ pathname: '/posts', query: { id: props.postId } }}>
      <meta itemProp="datePublished" content={props.publishedDateTime} />
      <time dateTime={props.publishedDateTime}>
        <span className="day"> {props.publishedDay} </span>
        <span className="month-year"> {props.publishedMonth} {props.publishedYear} </span>
      </time>
    </Link>
    <div className="content">
      <Link to={{ pathname: '/posts', query: { id: props.postId } }}>
        <h2 className="post-title" itemProp="name">{props.title}</h2>
      </Link>
      <p className="description">
        {props.description + " "}
        <Link className="link" to={{ pathname: '/posts', query: { id: props.postId } }}>
          {props.readMoreText || "Read More..."}
        </Link>
      </p>
      <div className="tags">
        {props.tags ? renderTags(props.tags) : null}
      </div>
    </div>
  </article>

PostListItem.propTypes = {
  publishedDateTime: PropTypes.string,
  publishedDay: PropTypes.string,
  publishedMonth: PropTypes.string,
  publishedYear: PropTypes.string,
  linkUrl: PropTypes.string, //relative link
  title: PropTypes.string,
  description: PropTypes.string,
  readMoreText: PropTypes.string, //title ex: "read more..."
  tags: PropTypes.array,
}

export default PostListItem;
