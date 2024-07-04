# Search

_Since_: 0.4.19

Search component is used for integration with StreamX search service.
It allows you to search for published pages by their names and content.

## Configuration

To use Search component in your space you need to provide a Search configuration.
  - go to OSGI configurations console (usually http://[host]:[port]/system/console/configMgr)
  - find "Search configuration" and add one for your space, like this:
<p align="center" width="100%">
    <img class="image--with-border" src="./_images/search-search-configuration.png" alt="Search configuration">
</p>

## Usage

Drag & drop Search to a Page Section. 
If search endpoint has been set, it will look like this:
<p align="center" width="100%">
    <img class="image--with-border" src="./_images/search-endpoint-set.png" alt="Search endpoint configured">
</p>

Otherwise you will see error message:
<p align="center" width="100%">
    <img class="image--with-border" src="./_images/search-endpoint-empty.png" alt="Search endpoint not set">
</p>

## Authorable properties

Click <img class="image--inline" src="../_images/edit-icon.png" alt="Edit icon"> ("Edit" icon).

  - you can limit the number of pages returned by search service

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/search-dialog.png" alt="Search dialog">
</p>

## Rendered component

[//]: # (TODO add component groups info)

If search endpoint is not set, component will not be rendered in preview/published mode.

If search endpoint is configured, you will see a single input.
<p align="center" width="100%">
    <img class="image--with-border" src="./_images/search-preview-untouched.png" alt="Search in preview mode">
</p>

Click the input and a modal window will appear:
<p align="center" width="100%">
    <img class="image--with-border" src="./_images/search-preview-modal.png" alt="Search modal">
</p>

Start to type symbols in the input. After there are at least three of them, 
request to search endpoint will be sent and you will see the result.

For this example, Homepage has been published so we see it in search output.
<p align="center" width="100%">
    <img class="image--with-border" src="./_images/search-preview-result.png" alt="Search result">
</p>

Every row of the result contains page name and a piece of content that matches your request.
