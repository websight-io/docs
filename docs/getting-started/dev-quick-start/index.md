# Developers Quick Start Guide

## Introduction

Use this guide to learn how to update a simple Howlite component. We recommend completing the general [quick start guide](/docs/getting-started/quick-start/index.md) first to get familiar with basic concepts.

The scenario utilises a sample component library [Howlite](https://github.com/websight-io/howlite) and a demo site project _Luna_. For simplicity, we overrode the _Title_ component included in the [Howlite](https://github.com/websight-io/howlite) collection in advance and prepared the _Luna Title_ component defined inside the demo site project. 

Your task is to update the _Luna Title_ component and extend existing functionality and tests. See more details in the sections below.

!!! info "Important notice"

    All scripts presented below are designed for Linux-based platforms. If you are a Windows user, please install and configure [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install) (WSL).

## Part A: Prerequisites

1. Install [AdoptOpenJDK 17](https://adoptium.net/) with 'x64/aarch64' architecture (on mac use `brew install openjdk@17`):
``` script
$ java --version
openjdk 17.0.2 2022-01-18
OpenJDK Runtime Environment Temurin-17.0.2+8 (build 17.0.2+8)
OpenJDK 64-Bit Server VM Temurin-17.0.2+8 (build 17.0.2+8, mixed mode)
```
1. Install Maven 3.8.5+

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).


## Part B: Setup local environment

### Download Maven configuration

Create a dedicated settings file to not override your default configuration.

``` shell
mkdir -p ~/.m2
curl -s https://repo.websight.io/settings-websight-public.xml --output ~/.m2/websight-settings.xml
```

### Build Howlite

Clone _Howlite_ repository and build it.

```shell
git clone git@github.com:websight-io/howlite.git
cd howlite
mvn clean install -s ~/.m2/websight-settings.xml -P e2e
cd ..
```

### Build Luna

Clone _Luna_ repository and build it.

```shell
git clone git@github.com:websight-io/luna-project.git
cd luna-project
mvn clean install -s ~/.m2/websight-settings.xml -P e2e
```

### Run docker environment
```shell
docker compose -f environment/docker-compose.yml up -d
```

Congratulations! Your local environment is ready. Open [http://localhost:8080/](http://localhost:8080/) and login using `wsadmin`/`wsadmin` credentials.

## Part C: Changing component

!!! info "Hint"
    If you need help to navigate inside WebSight see the general [getting started](/docs/getting-started/quick-start/index.md) for details.

### Business requirement

Let's imagine the following scenario. Page onwer wants to update the title of the New Grand Luxor Jewelry Collection.

![The current title](TBD.png)

The ask is to keep the collection name in one line and decrease the font size for the text `Meet our`. Expected result is designed and presented below.

![Expected result](TBD.png)

### Technical scope

You need to extend the _Title_ component included in the [Howlite](https://github.com/websight-io/howlite) to implement the above requirement. However, let's check the orginal component first to identify the scope of changes. Run WebSight, open _Luna_ space and edit home page. Find the _Title_ having text `Meet our New Grand Luxor Jewelry Collection` and edit its properties.

![Title dialog properties](TBD.png)

Enable `Overline text` option, move `Meet our` from `Heding text` to `Overline text` and submit changes.

![Updated title](TBD.png)

The result is close to the expectation, but the font size of the overline text is too small. You could prepare a new version of the _Title_ component having a different font size for the overline text. However, this is not a flexible solution. An additional input field to define the font size for the overline text is a better option. 

!!! info
    For simplicity, we overrode the original component in advance and prepared the _Luna Title_. It is a part of the demo site project, but it is just a placeholder. It works exactly as the _Title_. The following sections guide you on how to implement the change.

### Component update

Your task is to enable the setting of the overline font size.

Firstly, you need to add a new field `overlineSize` in the model class `LunaTitleComponent.java`. Let's define a default size `hl-title__heading--size-5` according to the received design too.

```java title="luna/core/src/main/java/pl/ds/luna/compoennts/models/LunaTitleComponent.java"
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

Next, you need to update the component HTML template. The orginal one defines the CSS class determining the font size as `hl-title__heading--size-6`.

```html
<h6 class="hl-title__heading hl-title__heading--size-6" 
    data-testid="overline">${model.subtitle}</h6>
```
As you updated the model class, you can use its property now.

```html title="luna/core/src/main/resources/apps/luna/components/title/template.html"
<h6 class="hl-title__heading ${model.overlineSize}" 
    data-testid="overline">${model.subtitle}</h6>
```

The last step is to add the field to the dialog used by authors. They need it to define component properties in the page editor. You have to override the dialog definition from Howlite. Create a new `.content.json` file inside the dialog directory.

```json title="luna/core/src/main/resources/apps/luna/components/title/dialog/.content.json"
{
  "sling:resourceType": "wcm/dialogs/dialog",
  "tabs": {
    "sling:resourceType": "wcm/dialogs/components/tabs",
    "generalTab": {
      "sling:resourceType": "wcm/dialogs/components/tab",
      "container": {
        "sling:resourceType": "wcm/dialogs/components/container",
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

The above definition specifies the new `overlineSize` field. It is placed before `overline` field and uses heading size definition from Howlite, but with **small** size selected by default.

### Install changes 
Run the following command to install the changes on your local environment.
```shell
mvn -f luna/core/pom.xml clean install -P autoInstallBundle
```

## Part D: Running functional tests

Our functional tests are running during maven build 
```shell
mvn clean install -P e2e
```

but you cna also run them on your local environment. 
You have to add the test content and run functional tests:
```shell
mvn -f luna/tests/content/pom.xml clean install -P autoInstallPackage
npm run-script test --prefix luna/tests/end-to-end
```

Functional tests detect your changes, so they fail:
```
Running:  title.cy.ts                                                                     (1 of 1)


Title component
  1) renders correctly in preview mode
  2) renders correctly in edit mode


0 passing (8s)
2 failing

1) Title component
     renders correctly in preview mode:

    AssertionError: expected '<h6.hl-title__heading.hl-title__heading--size-5>' to have CSS property 'font-size' with the value '20px', but the value was '25.008px'
    + expected - actual

    -'25.008px'
    +'20px'
    
    ...

2) Title component
     renders correctly in edit mode:

    Timed out retrying after 4000ms
    + expected - actual

    { 'sling:resourceType': 'luna/components/title',
       title: 'New heading',
       showSubtitle: 'true',
    -  overlineSize: 'hl-title__heading--size-5',
       subtitle: 'New overline text',
       'jcr:primaryType': 'nt:unstructured',
       headingLevel: 'h1',
       headingSize: 'hl-title__heading--size-2' }
```

First test detects change in default font size, and the second one detects new property added to component.

### Update functional tests
As functional tests fail due to changes you expected, so you have to update those tests. They are placed in file `luna/tests/end-to-end/tests/title.cy.ts`. 
Let's change:

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

```typescript
    cy.request(
      '/content/luna-test/pages/Title/jcr:content/rootcontainer/maincontainer/pagesection/title.json'
    )
      .its('body')
      .should('deep.eq', {
        'sling:resourceType': 'luna/components/title',
        title: 'New heading',
        showSubtitle: 'true',
        overlineSize: 'hl-title__heading--size-5',
        subtitle: 'New overline text',
        'jcr:primaryType': 'nt:unstructured',
        headingLevel: 'h1',
        headingSize: 'hl-title__heading--size-2'
      });
```

### Running functional tests
You can run functional tests again by running maven build
```shell
mvn clean install -P e2e
```

or on local environment:
```shell
mvn -f luna/tests/content/pom.xml clean install -P autoInstallPackage
npm run-script test --prefix luna/tests/end-to-end
```

This time we expect passing tests:
```
Running:  title.cy.ts                                                                     (1 of 1)
 
 
Title component
  ✓ renders correctly in preview mode (1030ms)
  ✓ renders correctly in edit mode (2774ms)


2 passing (4s)

```


## Part E: Use updated component

!!! info "Hint"
    If you need help to navigate inside WebSight see the general [getting started](/docs/getting-started/quick-start/index.md) for details.

Open _Luna_ space and edit home page (see ). Find _Luna Title_. Drag and drop it on the page. 
![](luna-title-componet.png)

This component allows to set title with optional overline. 
![](luna-title-view-before.png)

It allows to set level and size for main title.
![](luna-title-dialog-before.png)

Now our overline should be bigger then previously
![](luna-title-view-after.png)

> If there are no visual changes than probably HTL script was cached. You should go to [http://localhost:8080/system/console/scriptcache](http://localhost:8080/system/console/scriptcache) and clear cache

And you can change **Overline size**
![](luna-title-dialog-after.png)

## Part F: Clean-up

### Stop the environment

After all you can stop your environment by running:

```shell
docker compose -f environment/docker-compose.yml down
```

### Delete environment

If you don't want to work on your environment than you can delete it using script:

```shell
sh environment/delete.sh
```