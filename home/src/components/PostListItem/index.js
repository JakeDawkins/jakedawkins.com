import React, { PropTypes } from "react";

const renderTags = (tags) => {
  return tags.map(tag => {
    return <a href={`/categories/#${tag}`}>{tag}</a>
  });
}

const PostListItem = (props) =>
  <article role="article" className="post-item" itemScope="itemscope" itemType="http://schema.org/BlogPosting" itemProp="blogPost">
    <a className="datetime" href={props.linkUrl}>
      <meta itemProp="datePublished" content={props.publishedDateTime} />
      <time datetime={props.publishedDateTime}>
        <span className="day">{props.publishedDay}</span>
        <span className="month-year">{props.publishedMonth} {props.publishedYear}</span>
      </time>
    </a>
    <div className="content">
      <a href={props.linkUrl}>
        <h2 className="post-title" itemProp="name">{props.title}</h2>
      </a>
      <p className="description">
        {props.description}
        <a href={props.linkUrl} className="link">
          {props.readMoreText || "Read More..."}
        </a>
      </p>
      <div className="tags">
        {renderTags(props.tags)}
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

/*
<a href="/categories/#machine learning">machine learning</a>
<a href="/categories/#artificial intelligence">artificial intelligence</a>
<a href="/categories/#statistics">statistics</a>
*/