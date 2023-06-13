# Page Editor

## Overview

_Page Editor_, a core part of WebSight CMS, is an essential tool for content authors.
It allows the content authors to build pages using [_components_](../components) in a WYSIWYG way.
They can work with _components_ on a page using intuitive drag-and-drop functionality. They can also provide
content and configuration to the _components_.

![Page Editor](images/page-editor-overview.png)

## Component actions

When a component is selected the list of available actions becomes visible in the toolbar.
Action name is the technical identifier used, such as the [Edit configuration](../components/#edit-configuration).
List of actions available by default:

| Title         | Name              | Description                                                    |
|---------------|-------------------|----------------------------------------------------------------|
| Edit          | `inline-edit`     | Starts inline editing, see [Inline editing](../inline-editing) |
| Properties    | `edit-properties` | Opens a dialog to edit component properties.                   |
| Copy          | `copy`            | Copies the component.                                          |
| Cut           | `cut`             | Cuts the component.                                            |
| Paste         | `paste`           | Pastes the component after copy or cut.                        |
| Select parent | `select-parent`   | Changes active component to the parent component.              |
| Delete        | `delete`          | Deletes the component.                                         |

## Technical details

### Edit Mode

_Edit mode_ is used for editing page content.

#### Workspace content presentation

_Edit mode_ displays the edited page inside an iframe. The iframe is stretched vertically to match the content height to provide a canvas-like experience to content authors. It is accomplished by reacting to content height changes and fixing issues that result from displaying an iframe in this way (like using `vh` unit).
As a result, the edited page itself is not scrollable, so the content author will not see any changes to the edited page that happen on scroll (for example, sticky positioning will not work).

#### Workspace Overlays

The edited page is (mostly) not altered; all UI is displayed in _edit mode_ directly. All the UI elements of the mode are displayed outside the iframe to increase the separation of the two. We wanted to achieve the highest possible level of sandboxing for the edited page.

The especially important and technically complex parts of _edit mode_ UI are _overlays_, including:

- Component selectors - "borders" marking the content of a given component instance.
- Selected component toolbar - toolbar with actions allowed for a selected component.
- Placeholders - placeholders generated for components without content.

All these items are displayed on top of the iframe containing the edited page. The content author interacts with _overlays_, not the elements of the edited page.

The iframe with _overlays_ on top of it is called _workspace_.

#### Areas

_Overlays_ locations are based on _areas_, the representation of size and position of the [_components_](../components) in the edited page. The _areas_ are calculated based on the edited page elements. Each _component_ has a corresponding _area_, covering all its DOM elements.

To display _overlays_ that are up to date with what is happening on the edited page, it is not enough to calculate _areas_ once, on the iframe load. Nor is it enough to recalculate them on _actions_ (like adding, deleting and editing a _component_). Thus, we observe all DOM elements inside the iframe to react to size and position changes of _components_ and recalculate the _areas_ every time. This ensures that the _overlays_ display correctly in cases like:

- asynchronous loading of resources (like images and videos).
- dynamic changes using JavaScript scripts.
- dynamic changes using CSS animations.

### Preview mode

_Preview mode_ displays the edited page inside an iframe as well, but in this case the iframe’s height adjusts to fit the available space in the _page editor_. This way the iframe is displayed in a more "natural" way, similar to how the published page is displayed in a browser window. The iframe is scrollable, meaning it will react to scroll events (e.g., to support sticky elements). It also handles the `vh` unit properly.
