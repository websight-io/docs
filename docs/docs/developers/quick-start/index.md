# Developers Quick Start Guide

## Introduction

This guide explains how to update a simple Howlite component. Before you complete this guide, we recommend completing the basic [quick start guide](/docs/quick-start/) first so that you understand basic WebSight CMS concepts.

For demonstration purposes, this guide uses a sample component library, [Howlite](https://github.com/websight-io/howlite), and a demo site project, _Luna_. For the sake of simplicity, we overrode the _Title_ component included in the [Howlite](https://github.com/websight-io/howlite) collection in advance and preconfigured the _Luna Title_ component inside the demo project. 

Your task in completing this guide is to update the _Luna Title_ component and extend existing functionality and tests. The sections below explain more detail.

!!! info "Important notice"

    All scripts presented below are designed for Linux-based platforms. If you are a Windows user, please install and configure [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install) (WSL) to use this guide.

## Part A: Prerequisites

1. Install [AdoptOpenJDK 17](https://adoptium.net/) with 'x64/aarch64' architecture (on macOS use `brew install openjdk@17`):
1. Install Node.js and NPM
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
1. Install [Git](https://git-scm.com/)

## Part B: Setup local environment

First, clone the _Luna_ repository and build it within your local environment using the following commands:

```shell
git clone https://github.com/websight-io/starter.git
cd starter
./mvnw clean install -P e2e
```

Then, start a Docker environment.
```shell
docker compose -f environment/local/docker-compose.yml up -d
```

Congratulations! Your local environment is now ready. To view it, open [http://localhost:8080/](http://localhost:8080/) in a Web browser and log in using the credentials `wsadmin`/`wsadmin`.

## Part C: Changing component

!!! info "Hint"
    If you need help navigating inside WebSight, see the basic [getting started](/docs/quick-start/) guide for details.

### Business requirement

Let's imagine the following scenario: A page owner wants you to update the title of the page that describes the company's new Grand Luxor Jewelry Collection.

![The current title](the-current-title.png)

To fulfill this request, you are asked to keep the collection name on one line and decrease the font size for the text `Meet our`. The expected result is presented below.

![Expected result](the-expected-result.png)

### Technical scope

To do this, you need to extend the _Title_ component included in the [Howlite](https://github.com/websight-io/howlite) library. Before doing that, let's check the orginal component first to identify the scope of changes.

Run WebSight, open the _Luna_ space and edit the home page. Find the _Title_ component that contains the text `Meet our New Grand Luxor Jewelry Collection` and edit its properties.

![Title dialog properties](title-dialog-properties.png)

Enable the `Overline text` option, move `Meet our` from `Heading text` to `Overline text` and submit changes.

![Updated title](title-updated.png)

As you can see, the result comes close to meeting the expectation, but the font size of the overline text is too small. You could prepare a new version of the _Title_ component with a different font size for the overline text. However, this is not a flexible solution. Creating an additional input field to define the font size for the overline text is a better option.

!!! info
    For simplicity, we overrode the original component in advance and prepared the _Luna Title_ component. It is a part of the demo site project, but it is just a placeholder. It works exactly as the _Title_. The following sections guide you on how to implement the change.

### Component update

Your task is to enable setup of the overline font size. 

To start, first you need to add a new field, `overlineSize`, to the model class `LunaTitleComponent.java`. Let's define a default size `hl-title__heading--size-5` according to the received design as well. The following Java code will do this:

```java title="application/backend/src/main/java/pl/ds/luna/compoennts/models/LunaTitleComponent.java"
package pl.ds.luna.components.models;

import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import pl.ds.howlite.components.models.TitleComponent;

@Model(adaptables = Resource.class)
public class LunaTitleComponent extends TitleComponent {
  
  @Inject
  @Default(values = {"hl-title__heading--size-5"})
  private String overlineSize;
  
  public String getOverlineSize(){
    return overlineSize;
  }

}
```

Next, you need to update the component HTML template. The original one defines the CSS class that determines the font size as `hl-title__heading--size-6`.

```html
<h6 class="hl-title__heading hl-title__heading--size-6" 
    data-testid="overline">${model.subtitle}</h6>
```
Because you updated the model class, you can use its property now.

```html title="application/backend/src/main/resources/apps/luna/components/lunatitle/lunatitle.html"
<h6 class="hl-title__heading ${model.overlineSize}" 
    data-testid="overline">${model.subtitle}</h6>
```

The last step is to add the field to the dialog used by authors. They need it to define component properties in the page editor. To enable this, you have to override the dialog definition from Howlite. Do so by creating a new `dialog` directory and put `.content.json` file inside.

```json title="application/backend/src/main/resources/apps/luna/components/lunatitle/dialog/.content.json"
{
  "tabs": {
    "generalTab": {
      "container": {
        "overlineSize": {
          "sling:resourceType": "wcm/dialogs/components/include",
          "sling:orderBefore": "overline",
          "path": "/libs/howlite/components/common/headingsize",
          "include": {
            "sling:resourceSuperType": "/libs/howlite/components/common/headingsize",
            "label": "Overline size",
            "name": "overlineSize",
            "description": "Changes font size",
            "s": {
              "selected": true
            },
            "m": {
              "selected": false
            }
          }
        }
      }
    }
  }
}
```

The above definition specifies the new `overlineSize` field. It is placed before the `overline` field and uses a heading size definition from Howlite, but with _small_ size selected by default.

### Apply changes 
Run the following command to apply the changes to your local environment.
```shell
./mvnw -f application/backend/pom.xml clean install -P autoInstallBundle
```

## Part D: Functional tests

### Run functional tests

We continuously improve WebSight CMS by adding new features, improving the UX, and fixing bugs. Thus, we need confidence that changes don't lead to any regression on websites. To provide this confidence, we use [Cypress](https://www.cypress.io/) to enable automated testing of content. This approach enables us to spend less time on manual testing and regression fixes. We can focus on developing new features and improvements instead.

To demonstrate automated functional testing, we prepared two sample functional tests for the _Luna Title_ component. They are executed during the Maven build process. You can run them using `npm` on your local environment as well. However, you have to add test content before running the tests. Use the following script to set this up:

```shell
./mvnw -f tests/content/pom.xml clean install -P autoInstallPackage
```

Now, you can run the tests using the following command:

```shell
npm run-script test --prefix tests/end-to-end
```

If you execute the tests, they will detect your changes for the _Luna Title_ and fail. You should get the following results:

```
Running:  lunatitle.cy.ts                                                                 (1 of 1)


Luna Title component
  1) renders correctly in preview mode
  2) renders correctly in edit mode


0 passing (8s)
2 failing

1) Luna Title component
     renders correctly in preview mode:

    AssertionError: expected '<h6.hl-title__heading.hl-title__heading--size-5>' to have CSS property 'font-size' with the value '20px', but the value was '25.008px'
    + expected - actual

    -'25.008px'
    +'20px'
    
    ...

2) Luna Title component
     renders correctly in edit mode:

    Timed out retrying after 4000ms
    + expected - actual

    { 'sling:resourceType': 'luna/components/lunatitle',
       title: 'New heading',
       showSubtitle: 'true',
    -  overlineSize: 'hl-title__heading--size-5',
       subtitle: 'New overline text',
       'jcr:primaryType': 'nt:unstructured',
       headingLevel: 'h1',
       headingSize: 'hl-title__heading--size-2' }
```

When a functional test fails, you should check why. It is expected in this case, as you implemented new requirements. Firstly, you updated the default font size of the overline component (to ensure consistency with the design). Secondly, you added a new property to the dialog for the component. The tests recognized both changes, and you should adjust them as well. The following section explains how to do so.


!!! info "Hint"
    A best practice is to start by changing a test so that it fails until you've made desired changes. Then, apply your changes so that the test passes.

### Update functional tests
When functional tests fail due to changes, you should adjust them. They are placed in file `tests/end-to-end/tests/lunatitle.cy.ts`. 

The first test checks the font size for the overline text. There are two component instances validated. Thus, you need to update assertions for both of them as follows.

```typescript
    cy.getByTestId('component_title1')
      .findByTestId('overline')
      .should('have.css', "font-size", "25.008px")
      .should('have.text', 'Additional overline text filled')
```

```typescript
    cy.getByTestId('component_title2')
      .findByTestId('overline')
      .should('have.css', "font-size", "25.008px")
      .should('have.text', 'Resized to 6 cols on L breakpoint')
```

The second test validates the dialog for the component. Update the test to recognize the new input field.

```typescript
    cy.request(
      '/content/luna-test/pages/LunaTitle/jcr:content/rootcontainer/maincontainer/pagesection/title.json'
    )
      .its('body')
      .should('deep.eq', {
        'sling:resourceType': 'luna/components/lunatitle',
        title: 'New heading',
        showSubtitle: 'true',
        overlineSize: 'hl-title__heading--size-5',
        subtitle: 'New overline text',
        'jcr:primaryType': 'nt:unstructured',
        headingLevel: 'h1',
        headingSize: 'hl-title__heading--size-2'
      });
```

### Run functional tests again

Now, you can execute the updated functional tests:

```shell
./mvnw -f tests/content/pom.xml clean install -P autoInstallPackage
npm run-script test --prefix tests/end-to-end
```

Both tests should pass this time. You should receive a report like the one below.

```
Running:  lunatitle.cy.ts                                                                 (1 of 1)
 
 
Luna Title component
  ✓ renders correctly in preview mode (1030ms)
  ✓ renders correctly in edit mode (2774ms)


2 passing (4s)

```

Congratulations! You updated the component, and it passed tests.

## Part E: Use the new component

!!! info "Hint"
    If you need help to navigate inside WebSight, see the general [getting started](/docs/quick-start/) for details.

The page owner can use the updated component now. Let's verify by checking it out in the admin interface.

Switch to WebSight CMS, open the _Luna_ space, and edit the home page. Find the _Title_ with text `Meet our New Grand Luxor Jewelry Collection`. 

Then, find the _Luna Title_ in the component tree on the left. Drag and drop the component on the page just below the original one. 

![Luna Title added](luna-title-component.png)


Edit properties of the _Luna Title_:

1. set _Heading size_ to `XL`
1. set _Heading text_ to `New Grand Luxor Jewelry Collection`
1. enable overline text
1. set _Overline size_ to `L`
1. set _Overline text_ to `Meet our` 

![Luna Title Dialog Properites](luna-title-dialog-properties.png)

Submit changes. The title should appear as expected now. You can delete the original _Title_ component to finalize the change.

![Updated Luna Title](luna-title-updated.png)

## Part F: Clean-up

### Stop the environment

After completing this guide, you can stop your local environment using Docker:

```shell
docker compose -f environment/local/docker-compose.yml down
```

The environment will still exist but will no longer be running.

### Delete environment

If you don't need your environment anymore, you can delete it permanently using a script.

```shell
sh environment/local/delete.sh
```

## Next steps

This guide walked thorugh the essentials of developing components for WebSight CMS. As a next step, we encourage you to explore additoinal details about the following:

- [Project setup](../setup/)
- [Application development](../development/)
- [Components development](../development/components/)
- [Dialogs](../development/dialogs/)
