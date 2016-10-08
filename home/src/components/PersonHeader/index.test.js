import PersonHeader from './';
import React from 'react';
import renderer from 'react-test-renderer';

describe("PersonHeader", () => {

  it("should exist", () => {
    const personHeader = renderer.create(
      <PersonHeader />
    );

    expect(personHeader).toMatchSnapshot();
  });

  it("should render props correctly", () => {
    // const personHeader = renderer.create(
    //   <PersonHeader />
    // );

    const personHeaderWithProps = renderer.create(
      <PersonHeader
        userDisplayName="test display name"
        userDescription="test description"
        userEmail="test@test.com"
        userTwitter="tw"
        userGithub="gh"
      />
    );

    expect(personHeaderWithProps).toMatchSnapshot();
    // expect(personHeaderWithProps).not.toBe(personHeader);
  });

});
