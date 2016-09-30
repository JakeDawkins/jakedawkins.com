import React from "react";
import PostListItem from "../PostListItem";

const renderPostListItems = (posts) => {
  return posts.map(post => {
    return <PostListItem {...post} />
  });
}

const PostList = (props) =>
  <section className="content">
    <main id="scroll" className="home" role="main" itemprop="mainContentOfPage" itemscope="itemscope" itemtype="http://schema.org/Blog">
      {renderPostListItems(props.posts)}
    </main>
  </section>

export default PostList;
