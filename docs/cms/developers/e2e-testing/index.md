# End-to-end testing

## Introduction

**End-to-end testing (E2E testing)** checks if the software is working correctly from the end user point of view. It verifies all the flows and actions which the user may perform when using the application. E2E tests should be executed in a real-world environment like a web browser to ensure that the testing closely resembles the actual user experience.

## Test content

To run tests in the context of CMS we need to decide what `content` created by authors we will use. In Websight CMS for testing purposes we can use the content from the following folders:

- `/content` - This is the initial content for CMS. It is a good place to keep the actual content used by the end user.
- `/tests/content` - This is the content which is only available during E2E testing. Here we can store the content which was crafted specifically for the purpose of testing, i.e. we can use this folder to test CMS components in isolation.

In your tests you can use `/content` and `/tests/content` folders simultanously.

## How we do E2E testing?

In Websight CMS we embraced the following ways of doing E2E testing:

- [Functional testing with Cypress](/cms/developers/e2e-testing/functional-testing)
- [Visual regression testing with BackstopJS](/cms/developers/e2e-testing/visual-regression-testing)