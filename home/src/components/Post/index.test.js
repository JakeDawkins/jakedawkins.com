import Post from './';
import React from 'react';
import renderer from 'react-test-renderer';

describe("Post", () => {

  it("should exist", () => {
    const post = renderer.create(
      <Post
        markdown="hello\n\nworld"
      />
    );

    expect(post).toMatchSnapshot();
  });

  it("should render props correctly", () => {
    const post = renderer.create(
      <Post
        markdown="hello\n\nworld"
      />
    );

    const postWithProps = renderer.create(
      <Post
        markdown="hello\n\nworld"
        backLinkUrl="/testback"
        disableBackLink={true}
        disableAuthor={true}
      />
    );

    expect(postWithProps).toMatchSnapshot();
    expect(postWithProps).not.toBe(post);
  });

});
