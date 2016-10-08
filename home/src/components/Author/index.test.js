import Author from './';
import React from 'react';
import renderer from 'react-test-renderer';

describe("Author", () => {

  it("should exist", () => {
    const author = renderer.create(
      <Author />
    );

    expect(author).toBeDefined();
  });

  it("should render props correctly", () => {
    const author = renderer.create(
      <Author
        userDisplayName="Test Name"
        userImageUrl="123456"
        userDescription="this is a description"
        userEmail="1234@1234.com"
      />
    );

    expect(author).toMatchSnapshot();
  });

});
