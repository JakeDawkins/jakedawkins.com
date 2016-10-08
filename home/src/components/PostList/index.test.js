import PostList from './';
import React from 'react';
import renderer from 'react-test-renderer';

const posts = [{
    postId: 0,
    publishedDateTime: "1475459431",
    publishedDay: "02",
    publishedMonth: "October",
    publishedYear: "2016",
    linkUrl: "/test", //relative link
    title: "tester",
    description: "very test much wow",
    readMoreText: "View on GitHub...", //title ex: "read more..."
    tags: ["web","react"],
    content: "madness",
  },{
    postId: 1,
    publishedDateTime: "1475459431",
    publishedDay: "02",
    publishedMonth: "October",
    publishedYear: "2016",
    linkUrl: "/test2", //relative link
    title: "tester2",
    description: "very test much wow 2",
    readMoreText: "View on GitHub2...", //title ex: "read more..."
    tags: ["web"],
    content: "madness2",
  }];

describe("PostList", () => {

  it("should exist", () => {
    const postList = renderer.create(
      <PostList posts={[]} />
    );

    expect(postList).toMatchSnapshot();
  });

  it("should render props correctly", () => {
    // const postList = renderer.create(
    //   <PostList posts={[]} />
    // );

    const postListWithProps = renderer.create(
      <PostList
        posts={posts}
      />
    );

    expect(postListWithProps).toMatchSnapshot();
    // expect(postListWithProps).not.toBe(postList);
  });

});
