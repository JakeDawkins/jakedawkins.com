import React from "react";
import PostListItem from "../PostListItem";

const sampleProps = {
  publishedDateTime: "2016-09-26 00:00:00 +0000",
  publishedDay: "26",
  publishedMonth: "September",
  publishedYear: "2016",
  linkUrl: "/ml-theory-pt2/", //relative link
  title: "Machine Learning Theory - Part 2: Generalization Bounds",
  description: " Last time we concluded by noticing that minimizing the empirical risk (or the training error) is not in itself a solution to the learning problem, it could only be considered a solution if we can guarantee that the difference between... ",
  readMoreText: "Read more about Machine Learning Theory - Part 2: Generalization Bounds", //title ex: "read more..."
  tags: ["machine learning", "artificial intelligence", "statistics"],
}

const TestContent = () =>
  <section className="content">
    <main id="scroll" className="home" role="main" itemprop="mainContentOfPage" itemscope="itemscope" itemtype="http://schema.org/Blog">
      <PostListItem {...sampleProps} />
      <PostListItem {...sampleProps} />
      <PostListItem {...sampleProps} />
    </main>
  </section>

export default TestContent;
