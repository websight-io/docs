# Developers quick start guide

## Introduction

!!! info "Important notice"

    Before you complete this guide, we recommend completing the basic [quick start guide](/cms/quick-start/) first so that you understand basic WebSight CMS concepts.

This guide uses [WebSight Blueprint](https://github.com/websight-io/websight-blueprint) - our sample project which demonstrates various functionality of Websight CMS and pre-configures for you the following features:

- Demo site project _Luna_
- [Howlite](https://github.com/websight-io/howlite) components library
- [End-to-end testing](/cms/developers/e2e-testing)

We will walk through the process of updating a simple Howlite component. 

In [WebSight Blueprint](https://github.com/websight-io/websight-blueprint) for the sake of simplicity, we overrode the _Title_ component included in the [Howlite](https://github.com/websight-io/howlite) collection in advance and created the _Luna Title_ component inside the demo project. 

Your task in completing this guide is to update the _Luna Title_ component and extend existing functionality. The sections below explain more detail.

!!! info "Important notice"

    All scripts presented below are designed for Linux-based platforms. If you are a Windows user, please install and configure [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install) (WSL) to use this guide.

## Part A: Prerequisites

1. Install [AdoptOpenJDK 17](https://adoptium.net/), make sure to install the version matching your CPU architecture (on macOS use `brew install openjdk@17`):
2. Install [Git](https://git-scm.com/)
3. _Optionally_, install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
 
## Part B: Setup local environment

First, clone the _WebSight Blueprint_ repository and build it within your local environment using the following commands:

```shell
git clone https://github.com/websight-io/websight-blueprint.git
cd websight-blueprint
```

Depending on your choice, you can use Docker to build and run the CMS instance or build and run it locally as a JVM application.

!!! tip "JVM application"
    ```bash
    ./mvnw clean package
    distribution/target/dependency/org.apache.sling.feature.launcher/bin/launcher \
      -f distribution/target/slingfeature-tmp/feature-websight-cms-starter-tar.json
    ```

!!! tip "Docker"
    ```bash
    docker build -t ds/websight-cms-starter . 
    docker run -p 8080:8080 --name websight-cms --rm \
      --mount source=segment-store-repository,target=/websight/launcher/repository ds/websight-cms-starter
    ```

Congratulations! Your local environment is now ready. To view it, open [http://localhost:8080/](http://localhost:8080/) in a Web browser and log in using the credentials `wsadmin`/`wsadmin`.

## Part C: Changing component

!!! info "Hint"
    If you need help navigating inside WebSight, see the basic [getting started](/cms/quick-start/) guide for details.

### Business requirement

Let's imagine the following scenario: A page owner wants you to update the title of the page that describes the company's new Grand Luxor Jewelry Collection.

![The current title](the-current-title.png)

To fulfill this request, you are asked to keep the collection name on one line and decrease the font size for the text `Meet our`. The expected result is presented below.

![Expected result](the-expected-result.png)

### Technical scope

To do this, you need to extend the _Title_ component included in the [Howlite](https://github.com/websight-io/howlite) library. Before doing that, let's check the original component first to identify the scope of changes.

Run WebSight, open the _Luna_ space and edit the home page. Find the _Title_ component that contains the text `Meet our New Grand Luxor Jewelry Collection` and edit its properties on the sidepanel.

![Title panel properties](title-panel-properties.png)

Enable the `Overline text` option, move `Meet our` from `Heading text` to `Overline text`.

![Updated title](title-updated.png)

As you can see, the result comes close to meeting the expectation, but the font size of the overline text is too small. You could prepare a new version of the _Title_ component with a different font size for the overline text. However, this is not a flexible solution. Creating an additional input field to define the font size for the overline text is a better option.

!!! info
    For simplicity, we overrode the original component in advance and prepared the _Luna Title_ component. It is a part of the demo site project, but it is just a placeholder. It works exactly as the _Title_. The following sections guide you on how to implement the change.

### Component update

Your task is to enable setup of the overline font size. 

To start, first you need to add a new field, `overlineSize`, to the model class `LunaTitleComponent.java`. Let's define a default size `hl-title__heading--size-5` according to the received design as well. The following Java code will do this:

```java title="applications/luna-custom-code/backend/src/main/java/pl/ds/luna/components/models/LunaTitleComponent.java"
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

```html title="applications/luna-custom-code/backend/src/main/resources/apps/luna/components/lunatitle/lunatitle.html"
<h6 class="hl-title__heading ${model.overlineSize}" 
    data-testid="overline">${model.subtitle}</h6>
```

The last step is to add the field to the dialog used by authors. They need it to define component properties in the page editor. To enable this, you have to override the dialog definition from Howlite. Do so by creating a new `dialog` directory and put `.content.json` file inside.

```json title="applications/luna-custom-code/backend/src/main/resources/apps/luna/components/lunatitle/dialog/.content.json"
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
./mvnw -f applications/luna-custom-code/backend/pom.xml clean install -P autoInstallBundle
```

## Part D: Use updated component

!!! info "Hint"
    If you need help to navigate inside WebSight, see the general [getting started](/cms/quick-start/) for details.

The page owner can use the updated component now. Let's verify by checking it out in the admin interface.

Switch to WebSight CMS, open the _Luna_ space, and edit the home page. Find the _Title_ with text `Meet our New Grand Luxor Jewelry Collection`. 

Then, find the _Luna Title_ in the component tree on the left. Drag and drop the component on the page just below the original one. 

![Luna Title added](luna-title-component.png)


Edit properties of the _Luna Title_ on the side panel:

1. set _Heading level_ to `H2` 
1. set _Heading size_ to `XL`
1. set _Heading text_ to `New Grand Luxor Jewelry Collection`
1. enable overline text
1. set _Overline size_ to `L`
1. set _Overline text_ to `Meet our` 

The title should appear as expected now. You can delete the original _Title_ component to finalize the change.

![Updated Luna Title](luna-title-updated.png)

## Part E: Clean-up

### Stop the environment

After completing this guide, you can stop your local environment by hitting `Ctrl+C` in the terminal window where you started it.
The environment will still exist but will no longer be running.

### Delete environment

If you don't need your environment anymore, you can delete it permanently by running the following command (depending on your choice of running the CMS as a JVM application or using Docker):

!!! tip "JVM application"
    Remove the `launcher` directory created by your local environment.

!!! tip "Docker"
    ```bash
    docker volume rm tar-repo
    ```

## Next steps

This guide walked through the essentials of developing components for WebSight CMS. As a next step, we encourage you to explore additional details about the following:

- [Project setup](../setup/)
- [Application development](../app-development/)
- [Components development](../components/)
- [Dialogs](../dialogs/)
- [Page editor](../page-editor/)
- [End-to-end-testing](../e2e-testing)
