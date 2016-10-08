import PostHeader from './';
import React from 'react';
import renderer from 'react-test-renderer';

describe("PostHeader", () => {

  it("should exist", () => {
    const postHeader = renderer.create(
      <PostHeader />
    );

    expect(postHeader).toMatchSnapshot();
  });

  it("should render props correctly", () => {
    // const postHeader = renderer.create(
    //   <PostHeader />
    // );

    const postHeaderWithProps = renderer.create(
      <PostHeader
        dateTime="12345"
        title="test title"
        description="description here"
      />
    );

    expect(postHeaderWithProps).toMatchSnapshot();
    // expect(postHeaderWithProps).not.toBe(postHeader);
  });

});
