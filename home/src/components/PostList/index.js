import React from "react";
import PostListItem from "../PostListItem";

let index = 0;

const renderPostListItems = (posts) => {
  return posts.map(post => {
    return <PostListItem key={index++} {...post} />
  });
}

const PostList = (props) =>
  <section className="content">
    <main id="scroll" className="home" role="main" itemProp="mainContentOfPage" itemScope="itemscope" itemType="http://schema.org/Blog">
      {renderPostListItems(props.posts)}
    </main>
  </section>

export default PostList;
