import MenuWithSearch from './';
import React from 'react';
import renderer from 'react-test-renderer';

describe("MenuWithSearch", () => {

  it("should exist", () => {
    const menuWithSearch = renderer.create(
      <MenuWithSearch />
    );

    expect(menuWithSearch).toMatchSnapshot();
  });

  it("should render props correctly", () => {
    const menuWithSearchSlide = renderer.create(
      <MenuWithSearch slide={true}/>
    );

    expect(menuWithSearchSlide).toMatchSnapshot();
  });

});
