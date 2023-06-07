# Container component

Container component is used to group content together (inside a [Page Section component](../page-section)). Container renders a simple __div__ html tag without extra styling.

## Usage

If you drag-and-drop a single Container component to the page, you will see a default placeholder.

<p align="center" width="100%">
    <img class="image--with-border" src="./placeholder.jpg" alt="Container placeholder">
</p>

## Multiple columns layouts
By using containers inside a page section, you can achieve multiple columns layouts. To see this in action, you can drag-and-drop the **4 Columns** predefined layout from the _Empty Sections_ group. See the [layouts](../layouts) page for details regarding predefined sections.

This layout consists of a Page Section component with 4 container components inside. Each container is resized to use 3 out of 12 columns. For resize options description please see the [grid](../grid/) page.

<p align="center" width="100%">
    <img class="image--with-border" src="./4-cols-layout.jpg" alt="4 columns layout">
</p>


## Authorable properties

Click <img class="image--inline" src="../images/edit-icon.jpg" alt="Edit icon"> ("Edit" icon) on the **Container** component to see its all editable properties.

<p align="center" width="100%">
    <img class="image--with-border" src="./dialog.jpg" alt="Container - general properties" width="500px">
</p>

- _General_ tab
    - you can drag-and-drop an image from the left assets panel, to add a background image (for each [breakpoint](../grid#breakpoints-definition) separately).
    - each breakpoint's asset will be rendered on this breakpoint only. For example, if you leave M breakpoint image blank, nothing will be rendered on tablet resolutions.
- _Layout_ tab and its properties are described [here](../grid/).