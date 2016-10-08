import Post from './';
import React from 'react';
import renderer from 'react-test-renderer';

const post = {
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
  };

describe("Post", () => {

  it("should exist", () => {
    const post = renderer.create(
      <Post />
    );

    expect(post).toMatchSnapshot();
  });

  // XXX compare component with no props to this one soon
  it("should render props correctly", () => {

    const postWithProps = renderer.create(
      <Post {...post} />
    );

    expect(postWithProps).toMatchSnapshot();
  });

});
