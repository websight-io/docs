# End-to-end testing

## Overview

End-to-end testing (E2E testing) checks if the software is working correctly from the end user point of view. It verifies all the flows and actions which the user may perform when using the application. E2E tests should be executed in a real-world environment like a web browser to ensure that the testing closely resembles the actual user experience.

While you can write your own E2E tests using your favorite tools you can also leverage our solution from [WebSight Blueprint](https://github.com/websight-io/websight-blueprint). In this project we implemented the following types of E2E tests:

- [Functional tests with Cypress](/cms/developers/e2e-testing/functional-testing)
- [Visual regression tests with BackstopJS](/cms/developers/e2e-testing/visual-regression-testing)

!!! info "Important notice"

    For more information about [WebSight Blueprint](https://github.com/websight-io/websight-blueprint) project see [Quick start for developers](/cms/developers/quick-start).

## Test content

To run tests in the context of CMS we need to decide what content we will use. In [WebSight Blueprint](https://github.com/websight-io/websight-blueprint) during testing we have configured to use content from the following folders:

- `/content` - This is the initial content for CMS. It is a good place to keep the actual content used by the end user.
- `/tests/content` - This is the content which is only available during E2E testing. Here we can store the content which was crafted specifically for the purpose of testing, i.e. we can use this folder to test CMS components in isolation.

In your tests you can use `/content` and `/tests/content` folders simultanously.