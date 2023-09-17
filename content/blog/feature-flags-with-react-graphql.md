---
external: false
title: Feature Flags with React & GraphQL
description: Build support for fetching feature flags, unique to users, in GraphQL
date: 2022-06-16
draft: false
---

## Overview

Feature flags come with all kinds of uses. From limiting certain users’ access to a feature all the way to A/B testing and release management. It may not be obvious, though, how to integrate feature flag loading into a React/GraphQL app.

This post will detail how we were able to do it at Carbon Health on our newest apps. There was some prior art to using Feature Flags in a friendly way (with a similar hook API as shown below), but my work was moving these hooks into our GraphQL service and update client apps with the ability to support these hooks with GraphQL instead of prior REST endpoints.

## The Schema

First up here is figuring out how to add feature flags into a GraphQL schema to begin with. This setup will depend on your individual feature flag provider and the kinds of data that the provider can return.

For the purposes of this post, we’ll assume the feature flag provider can return any kind of data, but that it will be JSON serializable. From a client, we’ll want to be able to fetch any number of feature flags at a time, and get back a list of flags and their values, which we’ll call the `FeatureFlagResponse` type.

```graphql
type FeatureFlagResponse {
  key: String!
  value: FeatureFlagResponseBlob
}

scalar FeatureFlagResponseBlob
```

We’re using a custom scalar here to indicate that these values are not simply a `String` (although that’s what the graphql service will be receiving—json). This is to indicate to clients that this data will need to be deserialized. In our case, that deserialization can just be JSON, but this could vary depending on the feature flag provider.

Lastly, the query to fetch feature flags looks like this:

```graphql
type Query {
  featureFlags(
    """
    Any extra parameters that will be sent along
    to the feature flag endpoint. These can also be used for targeting rules.
    """
    attributes: [FeatureFlagAttributeInput!]
    """
    The flag names to be retrieved
    """
    keys: [String!]!
  ): [FeatureFlagResponse]
}

input FeatureFlagAttributeInput {
  key: String!
  value: String!
}
```

You’ll notice the `attributes` argument here. This field is used for targeting of feature flags. For example, if you’re targeting a flag to a specific `user` to test out a new feature, you could pass a key and value to the attributes like so:

```graphql
query {
  featureFlags(
    keys: ["SHOULD_ENABLE_NEW_TEST_FEATURE"]
    attributes: [{ key: "userId", value: "123456" }]
  ) {
    key
    value
  }
}
```

This will allow the provider to accept any generic attributes, and allow flexibility to build just about any kind of flag. In this case, the feature flag provider can use logic like “If userId is 123456, then enable new test feature” without needing to make schema changes for every kind of attribute added.

### A note on Types

These types, depending on the setup, could definitely be more strongly typed. For example, `key` could be typed as an Enum rather than a string. But that would require constant schema updates and additional translation logic, which would add addition barrier to entry. Feature flags are an incredible tool, and should (in my opinion) be used widely and easily.

These generic string/blob inputs and outputs will certainly open up some room for error. One reason for these choices is the inability to make a type union with scalar values, but mainly, I left these types as they are to allow for maximum flexibility of feature flag providers and implementations. I’ll discuss more about type safety/fallbacks in the clent-side portion below.

## Building the React Hook

Building this flag logic in GraphQL gives us a couple options: either fetch the flag value like anything else in GraphQL when loading a page/component or (a slightly more interesting route) build a hook to fetch and batch flag loading.

The idea behind this isn’t novel; if you have feature flags loaded for 20 items on a page, rather than making 20 requests to fetch feature flags from the frontend, batch them all together into a single request. What we get in addition to this, though, is the ability to do it on the backend as well. If we query for all our flags in a single query, it makes it a little easier to fetch them in bulk in the GraphQL service as well. Of course, DataLoaders can (and probably should be) used in the GraphQL service to accomplish the same from flags fetched in multiple queries.

### The signature

For the hook itself, there are a couple things to note. First, the types in the hook need to be generic if you’re using TypeScript. That’s because of the blob response type that we defined in the GraphQL schema. In practice, this isn’t really a problem, and it’s fairly easy to use, but it still should be noted.

Second, since you can’t conditionally call a hook, we need to add a `skip` argument to it. This will prevent the hook from loading the flag when we don’t want it to.

Other than that, we can just pass the hook the string name of hook, any attributes the feature flag provider needs for evaluation, and set a default value in case lookup fails.

```jsx
function useFeatureFlag<T>(
  flagName: string,
  defaultValue: T,
  attributes?: AttributeMap,
  skip = false,
): [T | undefined, boolean]
```

The return from the hook is a tuple with the typecast value and a loading state.

The usage of the hook, then, looks like this:

```jsx
const [shouldEnableFeature, loading] = useFeatureFlag(
  'SHOULD_ENABLE_NEW_FEATURE',
  false,
  { userId: myUserId },
);
```

### The implementation

Building out the hook itself is a little trickier, and will depend heavily on what batching library you choose, but there will be some commonalities in how things are setup. I’ll outline the general algorithm, but stop short of showing full code examples, since they’re a bit lengthy.

```jsx
export function useFeatureFlag<T>(
  flagName: string,
  defaultValue: T,
  attributes?: AttributeMap,
  skip = false,
): [T | undefined, boolean] {
  const [value, setValue] = useState<T | undefined>();
  const {fetchFlags} = useContext(FeatureFlagContext);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    if (skip || !fetchFlags) return;

    const featureFlagRequest: FeatureFlagRequest = {
      attributes: attributes || {},
      key: flagName,
    };
    fetchFlags(featureFlagRequest, !anonymous)
      .then(v => isMountedRef.current && setValue(v as T))
      .catch(() => isMountedRef.current && setValue(defaultValue));
  }, [fetchFlags, anonymous, skip, defaultValue, attributes, flagName, isMountedRef]);

  const returnValue: T | undefined = skip ? defaultValue : value;

  const loading = returnValue === undefined;

  return [returnValue, loading];
}
```

This is just about the whole hook itself, ignoring the functions called within the hook. The general gist is this:

1. set up state variables to track the value for a single flag.
2. have a feature flag provider further up the render tree (we’ll look at this in a bit), and if the fetch flags util hasn’t been set up yet, then skip.
3. Inside of a useEffect, Call the fetchFlags util, which handles the batching, and when it returns either set the state with the return value or the default value
4. Return the value along with loading state

## fetchFlags

This function is pretty dense, and a large amount of the work is done inside it. I’m not going to include the complete logic for the function (maybe in a later code example) since this post isn’t about how to set up a batching function, but the important parts are this:

The fetchFlags function should iterate over incoming requests (function calls), and group them by unique sets of `attributes`. You should split off flags to a new “chunk” (a new request that will be made to the GraphQL service) anytime there is a collision with a request’s attributes and the attributes of a chunk. You can use [lodash’s intersection function](https://lodash.com/docs/4.17.15#intersection) to find the number of collisions like this:

```jsx
type Chunk = {
  attributes: AttributeMap,
  keys: Array<string>,
};

// we check to see 1) if there are any keys that overlap
// and 2) if they have different values to determine collisions
const collisions = intersection(chunkAttributes, requestAttributes).filter(
  (key) => {
    return chunk.attributes[key] !== request.attributes[key];
  },
);
```

After chunks are generated, we iterate over each chunk and make a GraphQL client query with them.

```jsx
client
  .query({
    query: FEATURE_FLAG_QUERY,
    variables: {
      keys: chunk.keys,
      attributes: chunk.attributes
        ? Object.entries(chunk.attributes).map(([key, value]) => ({
            key,
            value,
          }))
        : null,
      anonymous,
    },
  })
  .then(({ data }) => data.featureFlags);
```

We await all those operations to finish, and find the value for the flag originally requested by the hook and return it to the component.

## Conclusion

What you end up with is a flexible GraphQL api that can consume any generic feature flag provider and expose the ability to look up those flags by a batched (or not) GraphQL operation from any frontend app. In these examples, we use a hook to accomplish this most of the time, but that’s not mandatory.

This pattern of handling feature flags is powerful, and flexible, and hopefully would work for your use cases with minimal changes to the general setup.
