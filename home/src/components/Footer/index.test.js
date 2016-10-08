import Footer from './';
import React from 'react';
import renderer from 'react-test-renderer';

describe("Footer", () => {

  it("should exist", () => {
    const footer = renderer.create(
      <Footer />
    );

    expect(footer).toMatchSnapshot();
  });

  it("should render props correctly", () => {
    // const footerNoCollapse = renderer.create(
    //   <Footer />
    // );

    const footerWithCollapse = renderer.create(
      <Footer
        collapseMargins={true}
      />
    );

    expect(footerWithCollapse).toMatchSnapshot();
    // expect(footerWithCollapse).not.toBe(footerNoCollapse);
  });

});
