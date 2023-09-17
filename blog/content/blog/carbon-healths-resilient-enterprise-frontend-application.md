---
external: false
title: "Carbon Health's Resilient Enterprise Frontend Application"
description: 'A peek under the hood into how Carbon Health rebuilt their enterprise app, engineered for speed and resilience'
date: 2022-06-13
draft: false
---

## Overview

Because of the nature of the work we do at Carbon Health, it’s been important from day-one to build systems that are fault-tolerant, monitored, and scalable. With start of the rebuild for our dashboard for enterprise customers abut a year ago, these were principles we kept front-of-mind when choosing technologies and setups across the stack.

I’ve already written about many of the technical choices we made when designing this new application, so I won’t go into too many details there, but I would like to expand on the exact usage of many of these technical choices, and how they improve confidence in our application.

## Typescript

![A TypeScript React Component for a generic Icon](/images/blog/carbon-ts.png)

[TypeScript](https://www.typescriptlang.org/) isn’t a bold choice by any standard, and for many people working with modern JavaScript, it’s the default choice. The broad safety that TypeScript’s compiler offers is nowhere near perfect, but great for catching regressions caused by adjustments over time.

## GraphQL data layer

![Usage of generated types for Apollo's useQuery hook](/images/blog/carbon-graphql.png)

GraphQL is the data layer that we chose for the app. Since GraphQL is a strongly-typed API specification, we use [graphql-code-generator](https://www.graphql-code-generator.com/) and [Apollo Studio](https://studio.apollographql.com/) to generate API response types from our production endpoint.

This assists hugely in preventing bugs at the time of development, but also protects older code from accidental regressions with future schema changes.

In addition to the frontend benefits of GraphQL with generated types, our GraphQL service is also built to be resilient against underlying service outages. If a single service is unavailable when resolving queries, That’s not necessarily a total failure of the query. It’s possible to still resolve fields from other services for some queries.

## Automated Tests

![Testing a basic sign-in flow with Cypress](/images/blog/carbon-tests.png)

Static analysis can only get so far, so we test every component in isolation with Unit tests using [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/). We also run integration tests against component sets and multi-step workflows to make sure the transitions between states is accurate and doesn’t cause any runtime errors.

We use [Cypress](https://www.cypress.io/) tests for our end-to-end (e2e) test suite. We primarily do this to test critical user flows such as sign-in, page navigation, and loading of certain reports. These tests are indicative of flows that, if broken, would be considered a critical incident for the product

Because these tests are built to smoke test critical user journeys, we have set up scheduled, hourly tests against production. If, at any point, these tests fail, the team will be alerted immediately.

In addition to basic usability tests, we also use these e2e tests to automatically check some accessibility markers with [Axe](https://github.com/component-driven/cypress-axe)

## Sentry

![Manually triggering an exception logged to Sentry with Sentry.captureException](/images/blog/carbon-sentry.png)

[Sentry](https://sentry.io/) is the tool we use for error reporting. It has a robust integration with JavaScript and React and is initialized on app load. Sentry allows us to track generic unhandled errors as well as occurrences of errors that the team has identified as unlikely but possible. These are generally things that could happen because of a service outage, but we would like to be notified of immediately.

Any time a new untracked error is reported to Sentry, the team is notified through a dedicated Slack channel.

## Newrelic

![A chart in New Relic showing operation response times over time](/images/blog/carbon-nr.png)

We use [New Relic](https://newrelic.com/) in multiple select cases at Carbon to track and alert for key outages or health issues of services.

In the case of the enterprise dashboard, we have a dashboard in New Relic to track a number of key indicators that could affect the product. We track the health and response times of the underlying GraphQL service that acts as a gateway for all data fetching, as well as the response times for key high-intensity GraphQL operations, like the data-heavy reports generated for organizations.

In case of any issues detected by New Relic, a slack channel and optionally a [PagerDuty](https://www.pagerduty.com/) notification is triggered to alert the team and possible on-call engineers.

## Deployment

Carbon’s web apps are all deployed using [Vercel](https://vercel.com/), the hosting solution built by the team behind [Next.js](https://nextjs.org/). Vercel’s infrastructure allows us to quickly build and deploy apps, and distribute them to multiple regions with ease.

One of the largest benefits to using Vercel isn’t its production deployments, but pul request previews for frontend applications. Before pull requests are ever merged, a preview link is generated by Vercel. This preview build points to production backend services, allowing developers and product teams to test applications as they would be deployed before ever merging the pull request. This allows for quick but thorough and realistic testing.

Carbon releases multiple versions of each app and service daily, following a continuous deployment model. This further allows us to ship small features often, and subsequently test those features in production rapidly. Because of this, if a rollback is ever needed, it’s typically easy to identify the break, figure out what release caused the failure, and roll back to the previous one.

## Rollback

No matter how careful, it’s always possible for teams to ship bugs that have unintended consequences for the app, and cause problems. In rare cases, these bugs may be so severe that a rollback to a previous version of the app is required.

Vercel’s build and deploy pipeline allows us to very quickly roll back to a previous build of published apps, by finding a previous release’s URL in the dashboard. Once we have a url, we have a GitHub action set up to roll back the production app version to the version that URL points to.

But, of course, we don’t only rely on GitHub being online for our rollback mechanism. We have also documented how to roll back using Vercel’s CLI tool in case of emergency.

## Conclusion

This is only a subset of the tooling that Carbon uses to fortify applications, and this doesn’t even touch the tooling dedicated to the backend services that power these applications. On top of these services, is a set of engineering workflows and processes to make sure that deployments have been verified and are being released at appropriate times.

At the end of the day, nothing can prevent bugs. Nothing can completely assure the performance and reliability of an application in production without actually running the application in production. We strive to find a balance between developer experience and stability, and while this process is never quite perfect, we can only continue to improve iteratively.

I hope this information is useful and can serve as a blueprint for building resilient apps for others.
