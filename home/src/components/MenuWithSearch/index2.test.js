import MenuWithSearch from './';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

describe("MenuWithSearch", () => {

  it("should add slide class on click", () => {
    const menuWithSearch = TestUtils.renderIntoDocument(
      <MenuWithSearch />
    );

    //find the open icon and click
    const icons = TestUtils.scryRenderedDOMComponentsWithClass(menuWithSearch,'icon-menu');
    const openIcon = icons[0];
    TestUtils.Simulate.click(openIcon);

    //see if the wrapper has the slide class added
    const iconParent = TestUtils.scryRenderedDOMComponentsWithClass(menuWithSearch,'slideButton fade slide');

    expect(iconParent.length).toBe(1);
  });

  it("should remove slide class on click", () => {
    const menuWithSearch = TestUtils.renderIntoDocument(
      <MenuWithSearch />
    );

    //find the open icon and click
    const icons = TestUtils.scryRenderedDOMComponentsWithClass(menuWithSearch,'icon-menu');
    const openIcon = icons[0];
    const closeIcon = icons[1];
    TestUtils.Simulate.click(openIcon);
    TestUtils.Simulate.click(closeIcon);

    //see if the wrapper has the slide class removed
    const iconParent = TestUtils.scryRenderedDOMComponentsWithClass(menuWithSearch,'slideButton fade slide');

    expect(iconParent.length).toBe(0);
  });

});
