---
external: false
draft: false
title: React Style Guide
description: Build modern conventional React components
date: 2022-06-08
---

Building React components in a consistent way is critical for readability and maintainability. When components have similar controls and interaction patterns, it’s easier to know what to expect, but more importantly know when something isn’t working correctly.

## Overview

Everything mentioned in this document is heavily based on my own experience and opinions, but by no means is this the only correct way to build component systems. Some things are linked together, and changing one would require changes to another item in the list, but this combination of thoughts is by no means the only way to build applications. It is also not, very prescriptive about specific tools or frameworks (with a few exceptions), since tooling changes quicker than this document could be updated to accommodate. These ideas can largely be implemented a number of different ways effectively.

Companies and projects will vary, so adjust this guide as needed to fit.

## Philosophy

As a high-level philosophy, I’ve found the most success in making components modular, composable, and highly testable. With components that bring opinions with them instead of letting the caller do whatever they please, I’ve often found it easier to keep track of design systems and highlight inconsistencies in designs.

The philosophy I use is a minimal-control model. Components should work well on their own, but should be designed to fit in just about anywhere. Where this philosophy breaks apart, I often find an opportunity to improve designs or make components more robust. But when it comes to changing components, I do this when needed, rather than trying to plan for every use-case at the beginning.

## Organize components by primitives and compound components

Components can usually be broken down roughly into two categories, primitives (base UI elements) and more complex components built with other primitives. An example of this distinction is a primitive Image component vs a tile with a title over the top of an image which may use a Caption and Image primitive.

Primitive components should roughly try to only be built using the platform (react/react-native) native components (like div or View), but this rule isn’t always applicable. For example, a custom TextInput component may want to use a primitive Label or Icon component inside the bounds of the TextInput. In this case, defer to the idea of a design system’s building blocks. If an element is a “Base” design primitive, it should also be considered a primitive for the sake of this conversation.

Primitive and complex components should be kept separate. The idea, being that over time the primitive component set would slowly stabilize, and could even be pulled out into its own project to be used across multiple products.

## Use functional components

With the introduction of hooks to React, the core maintainers of React took a clear preference for the future of functional components over class components. Functional components had long been used for stateless components that did simple rendering, since they could be more readily instantiated and were more performant.

Functional components also get around many of the prevailing issues with using the “this” keyword in class components. A number of potential bug cases can be avoided by using classless components.

Unless required by older 3rd party libraries for specific integrations, new components should be written with functional components and the accompanying hooks.

## Build opinionated components

This point may be the most controversial in this guide, but it has worked well in my past experience.

Rather than exposing a prop for every kind of control, components should lean towards less flexibility and more opinionated designs. This may mean that certain elements of the component can’t be changed by the caller, but that can be a feature of this point, rather than a bug.

For example, a basic Label component may have an Icon and a Text child. When building this new component, it may be tempting to add a prop for everything from font color to font style (italic, bold, underline, etc), even to icon rotation (for reversing arrows, for example). This style of development may fit every use case, but it would also require significantly more testing, increase bundle sizes, and complexity. And that’s without considering future use-cases that were overlooked.

Rather than building in maximum flexibility, it will be easier to build, test, and later maintain components with a narrower functionality, fitting only the needs of uses on the primary roadmap. This will also open up conversations between developers and designers. I believe an ongoing conversation about design and UX consistency is a large benefit to this approach.

## Components should be responsive by default

One exception to the above rule about opinionated components is in their placement, sizing, and container styles.

It’s extremely useful to build components to be flexible by default. Sometimes, data needs to be displayed in a precise, true-to-size way, but usually that is not the case. With the nearly infinite possible combinations of screen sizes, it’s actually easier to build components that can be resized to almost any practical size. Example use cases (in a tool like Storybook for example), should include cases of smaller and larger containers for components, to verify that they can be scaled up or down without breaking the design.

## Components should allow overwriting of root styles

In addition, It’s useful to have the ability to overwrite the container styles of a component. Most complex components should have a “style” prop that allows the caller to append to or overwrite the styles for the root view of the component.

In the example given earlier, with a tile that had an image and title over the top, the default styles of this component may be to have squared corners with no shadow, but it may be useful to use this same component elsewhere that requires rounded corners or a drop shadow. Likewise, background colors of components can also be overwritten similarly.

With this one prop, a large number of things can be done to modify the display of the component without breaking its internal layout or functionality. This is the “sweet spot” for the balance between opinionated components and flexibility.

## Use controlled form elements

With the advent of form handling and validating libraries like Formik or react-form-hooks, form handling has been made quicker, more repeatable, and more scalable than ever. Validation logic can be easily shared, and field sets can be easily duplicated.

For these reasons, having form elements be controlled externally by another tool is extremely powerful. It may be overkill for certain small scenarios, but in those cases, usually a simple state variable can be used to control the state of the input.

## Prefer inline, atomic styling

There are an uncountable number of ways to style React components. From React Native’s “StyleSheet”, to SCSS files, to inline styles, to all-encompassing frameworks like Styled Components. Each different method has its own fanbase and primary use-cases, and at the end of the day, great products can be built with just about any styling technology.

Atomic inline styling, in many ways, benefits from the usefulness of these other methods, while avoiding many pitfalls.

Using a tool like Tailwind allows for inline-feeling styling of components, but also allows for deduplication of classes and smaller stylesheets after builds. Tailwind generates classes for individual style properties, and allows those classes to be composed to build the intended functionality. Using tailwind still easily allows for dynamic styling and manual overrides.

One major benefit of Tailwind and similar tools over their alternatives, is the ability to define a base set of styles, like a standard spacing unit (4/6/8px for example) or a base color palette. This makes it harder for component implementers to make the wrong choice and deviate from design patterns, as well as highlights instances where designers may have missed something, opening an opportunity for improving consistency.

## Use useMemo for calculations

Any time components perform complex calculations like sorting lists or averaging data, if this work is done inside the body of the component, there’s a risk of this work being done on every render, regardless of whether or not the data has changed. Use the “useMemo” hook to memoize these calculations.

## Use useCallback for functions passed to children

Similar to how useMemo is used, use the useCallback function any time a function is instantiated to pass to children. This will prevent the function from getting recreated on every rerender.

## Testing

### Unit test complex internal logic

Components often have complicated logic that controls how they work. One great example of this is a form component’s validation logic.

Rather than trying to test this logic by interacting directly with the component, extract it out into a utility function (either in the same file as a named export or a separate utility file) and test it separately.

### Unit test components

Components should tested as closely as possible to how they will be used. For this reason, the react-testing-library is an excellent library to use when unit testing components. It provides utilities to find and interact with components in rendered DOM. The library has many fantastic guides on their website.

As part of unit testing components, when possible, mock out complex rendered children. This will make tests more performant, less fragile, and easier to debug.

### Integration test component sets with shared state

Often, components will share state. A parent will have state or callbacks that it passes to multiple children, and changing one child subsequently ends up affecting the other.

Rather than trying to build out end-to-end (e2e) test suites for these cases, it’ll be quicker and often less fragile to integration test these components with a tool like react-testing-library.

### Build e2e smoke tests for most important flows

End-to-end (e2e) tests are highly effective, but also highly fragile and difficult to write properly. For this reason, prefer using e2e testing for smoke test of critical app flows.

As a rule of thumb if a feature would be classified as an incident or outage if it was broken, e2e test it. A great example of this kind of workflow is a login flow or a purchase flow.

### e2e tests should not depend on specific live data

When developing resilient e2e tests against production/staging data that’s not isolated to a single test run, try not to depend on specific production data. Building a test suite assuming a specific item will exist in production datasets is fragile, and could be a distraction. Instead, try to respond to production data. For example, when testing a search feature on an eCommerce site, rather than searching for a specific product that’s hard-coded in the test, first look at a list of products and store a product name/sku/upc to search for.

An exception to this rule would be if specific production data would be required. If your eCommerce site listed above sells only one thing, and that one thing disappears from the site, that would be a problem that should be addressed. Likewise, user account data may have to be hard-coded for a test user, since fetching user data for a generic user would be more dangerous.

In any case, if a test changes production data (even in isolation, like with a test organization), it should try to restore the data to its original state. This will make tests more repeatable, making debugging easier when things fail.

## Conclusion

This list of rules is nowhere near inclusive or mandatory. It is simply a starting point for making decisions that work well together when building React applications. Use it, adjust it, implement it however works for you.
