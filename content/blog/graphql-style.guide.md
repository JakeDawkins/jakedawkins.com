---
external: false
draft: false
title: GraphQL Style Guide
description: Designing a resilient GraphQL schema for large data graphs
date: 2022-06-02
---

> This document was originally started by myself for use on Carbon Health's data graph. It has since been expanded on and changed in some ways, to conceal private information about Carbon's graph or to omit irrelevant information for the public. As with any style guide, this was build by a combination of personal experience and also through guides compiled by others, so the thoughts (and some of the text) may be from other authors. I've tried to footnote specific instances of this as well as possible.

This document aims to establish a consistent and intentional style for designing a GraphQL schema.

In many sections, there is also a **tldr;** (too long, didn’t read) note with quick takeaways and practical instructions without the longer explanation above

## Philosophy

Much of this document aims to make schemas as flexible and robust as possible, hoping to prevent many situations which could be breaking changes for clients. GraphQL is designed in such a way to allow for constant schema changes and migrations in a safe way, preventing true “Breaking” changes from happening often. Combined with telemetry tooling such as Apollo Studio, we can also safely make changes that would otherwise be dangerous or breaking in a safe way. But avoiding these kinds of migrations in the first place is largely possible with thoughtful schema design.

For that reason, this style guide will begin with a discussion about breaking changes, what kinds of things are breaking vs non-breaking, then will go into depth on best practices for schema design to prevent necessary breaking migrations as the schema scales.

## Breaking & Nonbreaking Changes

When considering breaking and non-breaking changes, there are two main concerns. First is the more obvious one of the public API. Removing expected fields or adding required arguments to existing fields would result in errors for clients.

The less obvious concern with schema changes is the implications of code generation. There are a number of schema changes (like renaming a return type of a simple, non-union field) that wouldn’t result in runtime errors for already-deployed clients, but could cause issues in future releases, requiring renaming of internal types or changes to imports.

We should also consider these effects when reviewing schema changes. Below are some examples of breaking & non-breaking changes, but you can read more in [Apollo’s Docs](https://www.apollographql.com/docs/studio/schema-checks/#types-of-schema-changes).

## Non-breaking changes

GraphQL clients only receive data they explicitly request, so most additive changes in GraphQL schemas are non-breaking. Adding a field to a type, adding a new type, adding an optional argument to a query/mutation are all examples of non-breaking additive changes to a schema.

Note: some non-breaking additive changes can still cause issues. For example, adding a value to an enum value isn’t technically a breaking change, but if clients are matching on all possible enum values and don’t have some default case, there may be unexpected behavior.

Other non-breaking changes include:

- Adding a type to a union
- Applying an interface to an existing type
- Adding a nullable (optional) field to an input type

## Breaking Changes

Some breaking changes are obvious, like removing a field from a type. In this case, if a client is requesting a field, and expecting it to be there, removing it would be unexpected, and cause validation errors, causing the whole operation to fail. This would also break code generation for new builds. Using Apollo Studio, we can verify if a field is not used by any clients and decide when to safely make this kind of change.

Less obvious breaking changes often involve nullability. If a field in a return type was originally marked as non-nullable (!), and it is changed to be nullable, **that is a breaking change**. Clients requesting this field, may have made assumptions or assertions assuming this field will always exist. Making it nullable will frequently causing runtime errors for any clients. For this reason and others (mentioned below), we design fields as nullable by default. If we want to make that field non-nullable later, we can without it being a breaking change.

Similarly, for Input types, adding a new non-nullable field that didn’t previously exist will break all users of that operation, since the operation would fail in validation as well.

More potentially breaking changes include:

- Removing type from a union
- Removing an argument
- Removing a field from an Input type
- Removing a value from an Enum
- Changing a field or argument’s type
- Changing an argument’s default value

For more on breaking & non-breaking changes, see [Apollo’s docs on schema changes](https://www.apollographql.com/docs/studio/schema-checks/#types-of-schema-changes).

## Types

### Nullable by default

> [1]GraphQL allows fields to be “nullable” or “non-nullable”. The former means that null may be returned instead of a value of the specified type. In general, you should prefer using nullable fields to non-nullable ones, for the following reasons:

- It’s common for data to switch from required to not-required, and back again
- Even when there is no prospect of a field becoming optional, it may not be available at query time, due to service outages, runtime exceptions, etc.
- When a non-nullable field fails to resolve, it fails up the operation tree until the nearest nullable ancestor, and resolves that ancestor and all children as null.
- Changing from a non-nullable field to a nullable field is difficult with a versionless schema

[Additional Reading](https://www.apollographql.com/blog/graphql/basics/using-nullability-in-graphql/)

> tldr; use nullable fields wherever possible, and think if changing a field in the future would be possible or breaking for clients

## Naming

### Use specific type names

In a large organization with a large graph, non-specific type names often lead to confusion or later migrations.

Types should not be single, non-descriptive words
For example, an `Execution` type could mean something different to different teams or sections of the graph. It’d be better to name the type something like `RemindersJobExecution`.
When writing Input types, their names should be postfixed by `Input`. This eases confusion about the difference in input types and return types.

### Don’t namespace arguments or fields

Because fields and arguments are inherently related to their type, there’s no need to namespace them.

❗ Bad

```graphql
type Query {
  organization(orgId: ID!, locationId: ID): Organization
}
type Organization {
  id: ID
  orgName: String
}
```

‍
✅ Better

```graphql
type Query {
  # locationId isn't obviously associated with an org
  # so we'll leave it named as-is
  organization(id: ID!, locationId: ID): Organization
}
type Organization {
  id: ID
  name: String
}
```

### Namespace Mutations with the `entityAction` format

Since mutations mostly have to live at the root of the graph, and can't be scoped under other types easily like other things, we try to namespace them to make them easier to find and predictably nameable.

The general pattern we follow for mutation naming is

`Entity + Action = entityAction`

So the existing mutations:

- `organization` (entity) + `addMembers` (action on an organization) = `organizationAddMembers`
- `organizationMembers` (entities) + `changeGroup` (action on members) = `organizationMembersChangeGroup`

This pattern allows for easy searchability and when sorted alphabetically, keeps mutations on similar entities close together, making them easier to find.

> tldr; be specific with type names, and less specific for the types' fields and fields' arguments

## Pagination

Unless there is an explicit reason not to (like a guaranteed small set that needs to be fetched all at once), all list fields should be paginated by default and use the Connection interface.

```graphql
type Query {
  offices: [OfficeConnection]
}
type OfficeConnection {
  pageInfo: PageInfo!
  totalCount: Int
  nodes: [Office]
}
interface Connection {
  pageInfo: PageInfo!
  totalCount: Int
  nodes: [Node]
}
```

Pagination in the Graph is cursor-based, rather than offset-based, and has many pieces of tooling available on the frontend and in the GraphQL service to help handle this pattern.

The full RFC outlining this pagination model as well as additional reading and resources can be found [REDACTED]

## Linking Types

> [2]The nature of a “graph” is that types inherently are connected to other types, and you can traverse the graph from type-to-type. For this reason, when referencing one type from another, link directly to the type

❗ Bad

```graphql
type Appointment {
  id: ID!
  patientID: ID
}
```

✅ Better

```graphql
type Appointment {
  id: ID!
  patient: Patient
}
```

In this case, if you wanted the patient id from an appointment, you could just reference `appointment?.patient.id`. This is a little extra typing and a little more work to implement, but makes the graph as flexible as possible for the future, and prevents later schema migrations.

> tldr; avoid using typeId: ID fields, they're a code smell and should be replaced with `type: Type`

## Global Object Identity

An entity, for the sake of this conversation is any object that can be looked up in isolation using an id. Any entity in the graph should have an `id: ID!` field.

### The Node interface

A “Node ID” is a globally-unique, user-scoped id for a specific entity, making any entity searchable using a single, root-level node field in the graph. Graphs can implement this root field, by decrypting a node id into a given format, like `user_id:typename:id`. To clients, it would look like a random ID, but with a key, the id could be decrypted to perform entity fetches.

```graphql
interface Node {
  id: ID!
}
interface User implements Node {
  id: ID!
  email: String!
}
type Admin implements User {
  id: ID!
  email: String!
  roles: [Role]
  ...
}
```

One major benefit to implementing a node interface and corresponding resolvers is the ability to, through a single field, look up any entity in the graph. A common patter in GraphQL schema design is to use a lot of top-level lookup fields which essentially serve the same purpose. While you may still want to add some of these fields for the most used types as a convenience, using a node resolver can make schemas easier to navigate and reason about.

Another benefit to using a node interface is the ability to return lists of (or single) generic items. For example, if you're working on a news feed, there may be multiple kinds of data you want to display: articles, images, videos, links, etc. Using a node interface, any field can return a `Node` type (or a list of Nodes), and the client can decide how to render each item based on its `__typename`. If there are any types that are not being handled on the frontend, those are just ignored.

One downside to using a Node interface in practice is the type generation and type checking in frontend code.

```graphql
query MyUserQuery($myUserID: ID!) {
  node(id: $myUserId) {
    ... on User {
      email
    }
  }
}
```

In this example, a user lookup is being done, but since we're using Node as the return type here, we must use an inline fragment to select on the type we expect, even if we know what the return type should be. Because of this technical possibility of a different return type, we'll also need to guard against that type in the frontend code

```jsx
if (data.node.__typename !== 'User') {
  // handle other cases here, maybe just throwing errors,
  // since this should be an exceptionally rare case, and
  // could signify a bug
}
```

Despite the drawbacks of using a Node interface, the benefits generally outweigh the costs at scale, so Node interfaces should be used when possible. For more on how this specification works, see [GraphQL.org's documentation](https://graphql.org/learn/global-object-identification/).

> tldr; if an object can be identified by an id, implement the Node interface and add an ID

## The user boundary

A user boundary is a hard break in the graph, where only certain kinds of users can access data below that point in the graph. This can be used to control what "versions" of the graph users of a certain application have access to, or can be used to separate different kinds of users of a single application.

A user boundary is a fairly aggressive tool to use when designing a graph, and for most use cases would not be necessary. User boundaries are particularly useful when there are vastly different data needs for different kinds of users. Navigating a large graph may be difficult, and finding certain data could be challenging for people who are unfamiliar. A User boundary is an effective way to "section off" certain fields to a specific kind of user. This is also useful when trying to establish access control to fields. Sometimes, endpoints/data sources on the backend may be more permissible in their data access than preferred. Using a user boundary is one more way to prevent people from being able to access data meant for them.

With a user boundary defined, there is no way to make a single field available to multiple kinds of users without defining the field on more than one user type, so it’s important to know what kind of user(s) need access to the data that’s being added. The UserBoundary type union is blunt but effective way of keeping portions of the schema clean across multiple app users.

```graphql
union UserBoundary = AdminUser | DoctorUser | PatientUser | AuthenticationError

type Query {
  me: UserBoundary
}
```

Usage of the boundary from the client looks like this:

```graphql
query MyPatientData {
  me {
    ... on PatientUser {
      patient {
        datOfBirth
        cases { ... }
      }
    }
    ... on AuthenticationError {
      code
    }
  }
}
```

This way, a user can query for data that is accessible to a specific kind of expected user (like a patient) and fetch information relevant to a patient only.

## Errors as data

One of the benefits of GraphQL is the ability to customize errors and have usable error states for when things don’t go as planned. There are a couple methods for handling and representing errors to users, useful in different scenarios

There’s an excellent [talk by Sasha Solomon on representing errors as data in GraphQL](https://www.youtube.com/watch?v=RDNTP66oY2o).

### Errors in Queries

One of the first things encountered in Carbon’s GraphQL schema is the user boundary. It’s under the me field at the top of the schema, and represents one of the primary ways for representing query errors: a type union with Error Types.

Using type unions in GraphQL is extremely powerful. It allows the schema to represent complex error cases for fetching data. In the case of the user boundary, its type is defined like so:

```graphql
type Query {
  me: UserBoundary
}
union UserBoundary =
    AdminUser
  | SupportUser
  | DoctorUser
  | VisitorUser
  | AuthenticationError
```

This allows the resolver to return a specific kind of data or any number of error cases (in this example, only a single AuthenticationError case).

> tldr; for operations that are complex or involve information that could be useful for resolving errors, use a type union of the successful datatype and any error cases. Alternatively, for simple errors, just return null for the field.

### Errors in mutations

Mutations act in an interesting way: they’re used for modifying data, but also allow for refetching the updated data, allowing for proper cache updates on the client after the success of the operation. When writing a mutation, be sure to implement the `MutationResponse` interface to represent the success and error cases properly

```graphql
# This interface can be used on the result of an _entire_ mutation or on a _piece_ of the
# mutation, like in the case of updating multiple users, the result of updating each user

interface MutationResponse {
  # Overall success of the mutation. If there are any errors, this should be false
  success: Boolean!
  message: String
}
```

Currently, there is a message field in the response type interface, which is intended to be a user-readable error message. There is an open RFC (link redacted) for removing this field in exchange for an error code, which can be used for logical decisions on the client based on different kinds of errors

In the case of a mutation which updates a single piece of data (like modifying an attribute on a user), the `MutationResponse` can be implemented to return the modified object like so:

```graphql
type Mutation {
  userUpdateEmail(id: ID!, email: String!): UserUpdateEmailResponse
}
type UserUpdateEmailResponse implements MutationResponse {
  success: Boolean!
  message: String
  user: User
}
```

In more complex or bulk mutations, more data may be needed to fully represent the possible success and error (or partial error) cases of the mutation.

```graphql
type Mutation {
  organizationMembersSendInvitation(
    memberIds: [ID!]!
    message: String!
  ): OrganizationChangeMembersResponse!
}

# This response type can be used when editing/creating/moving bulk sets of members

type OrganizationChangeMembersResponse implements MutationResponse {
  success: Boolean!
  message: String
  members: [OrganizationMemberChangeResponse]
}

# This type can represent changes to any member that requires a refetch of the member

type OrganizationMemberChangeResponse implements MutationResponse {
  success: Boolean!
  message: String
  member: OrganizationMember
}
```

Note how this works: the two response types (one for `Member` and another for `Members`) each implement the `MutationResponse`, and the `OrganizationMemberChangeResponse` type returns the changed `Member`.

> tldr; for mutations, implement the MutationResponse interface for each piece of data being mutated as well as for the operation as a whole.

## Todo

This document is a continuous work in progress, and doesn't cover everything that should be considered when designing schemas, left out, and good points to add in the future include:

- When and how to use Custom scalars, e.g. DateTime
- Deprecation (removing and renaming fields)
- “Major” vs “Minor” schema changes
- Changes in convention, major new fields, branches of the graph, etc.

## Resources & References

- [1] [https://docs.gitlab.com/ee/development/api_graphql_styleguide.html#nullable-fields](https://docs.gitlab.com/ee/development/api_graphql_styleguide.html#nullable-fields)
- [2] [https://yelp.github.io/graphql-guidelines/schema-design.html#be-specific-when-naming-types](https://yelp.github.io/graphql-guidelines/schema-design.html#be-specific-when-naming-types)
- [3] [https://github.com/hendrikniemann/graphql-style-guide](https://yelp.github.io/graphql-guidelines/schema-design.html#be-specific-when-naming-types)
- [4] [https://atheros.ai/blog/graphql-best-practices-for-graphql-schema-design](https://atheros.ai/blog/graphql-best-practices-for-graphql-schema-design)
