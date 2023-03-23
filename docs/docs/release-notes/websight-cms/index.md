# WebSight CMS Release Notes

## 1.11.2 <small>March 23, 2023</small>

#### Page Editor
- Fixed the lack of refresh for the side panel with component properties after the user updated them in the modal.

#### Dialogs
- Fixed modal closing with _ESC_ button after changing a tab.

## 1.11.1 <small>March 21, 2023</small>

#### Page Editor
- Fixed blinking component selection and toolbar after changing component properties in the side panel.
- Improved selected component loading state after changing component properties in the side panel.
- Fixed the lack of component selection after changing component properties in the modal.

#### Dialogs
- Fixed [#63](https://github.com/websight-io/starter/issues/63) and [#149](https://github.com/websight-io/starter/issues/149) - [toggle](/docs/developers/development/dialogs/toggle/), [select](/docs/developers/development/dialogs/select/), [checkbox](/docs/developers/development/dialogs/checkbox/), [radio](/docs/developers/development/dialogs/radio/), [rich text editor](/docs/developers/development/dialogs/richtext-editor/), and [text area](/docs/developers/development/dialogs/text-area/) work right in the [multifield](/docs/developers/development/dialogs/multifield/) now. Additionally, the description for the input field included in the multifield is presented on hover.


## 1.11.0 <small>March 15, 2023</small>

#### Page Editor
- New feature from roadmap [#2](https://github.com/websight-io/roadmap/issues/2) - added the side panel with component properties.
- Improved workspace refresh after edit action  - only the updated component is reloaded now.
- Added [#140](https://github.com/websight-io/starter/issues/140) - the ability to set WCM mode in HTL.
- Improved UX for concurrent assets management - opening the list of assets from the assets panel in the page editor. 

## 1.10.0 <small>March 1, 2023</small>

#### Page and Asset Management
- Fixed crash when a user uploads multiple assets at the same time.
- Fixed broken list of pages for a space when its first node in the resource browser contains an object other than pages, for example, policies.
- Fixed blinking space dropdown when a user removed a space, and not available anymore.
- Fixed [#133](https://github.com/websight-io/starter/issues/133) - page name generated from the tile is lowercase now.
- Improved [#15](https://github.com/websight-io/starter/issues/15) - clicking a page name opens the page editor now.
- Improved the expandable panel with the tree on the left - added icons for pages and folders.
- Improved the preview of assets containing white objects on a transparent background (changed preview background to grey).

#### Admin tools
- Fixed page reordering in the resource browser.
- Fixed the missing icon for the _deny_ permission in the user manager. 

#### Dialogs
- Fixed an issue with closing the [Button Dropdown](/docs/developers/development/dialogs/richtext-editor/ui-components/button-dropdown/) for the [Rich Text Editor](/docs/developers/development/dialogs/richtext-editor/).

#### Other
- Fixed inconsistency of a new space name generated from the title.
- Fixed an issue with loading the manifest file by a browser.

## 1.9.1 <small>February 15, 2023</small>

#### Page Editor
- Improved the style for the page publication status dropdown.

#### Page and Asset Management

- Fixed the lack of scroll when returning from the page editor.

#### Admin tools
- Fixed the issue with renaming nodes in the resource browser.
- Fixed the issue with saving changes in the resource browser. 
- Unified action buttons order for dialogs.

#### Other
- Fixed the issue with entering _Title_ and _Name_ for a new space - changing the value moves the cursor to the end of the fields.

## 1.8.0 <small>February 1, 2023</small>

#### Page Editor
- Fixed the misaligned cursor and component during drag-and-drop (Chrome).

#### Other
- Updated paddings for the lists of spaces, pages, and assets.
- Fixed the scroll for the list of pages and assets - always visible even when there was no need.
- Improved stability of front-end tests (Cypress).

## 1.7.0 <small>January 18, 2023</small>

#### Page Editor
- Added ability to refresh the workspace on component changes.
- Fixed the issues with misaligned overlays on component changes.
- Fixed the issues with `vh` styles in the _edit mode_.
- Fixed the issue with additional space generated at the end of the workspace after zoom-in and zoom-out.

#### Page and Asset Management

- Fixed [#25](https://github.com/websight-io/starter/issues/25) - SVG files are displayed properly now.

#### Dialogs

- Fixed the issue for the [Date Picker](../../developers/development/dialogs/date-picker/) input field - presented a wrong value.
- Fixed the issue on pressing _enter_ - didn't close a modal in some cases.


#### Admin Tools
- Fixed [#12](https://github.com/websight-io/starter/issues/12) -  updated layout of the landing page for Admin Tools.

#### Other
- Unified UX for the left side panel for all views.


## 1.6.0 <small>December 21, 2022</small>

#### Page Editor
- Improved collapsing and expanding of the left side panel.
- Fixed the lack of the scroll for page preview.
- Fixed the missing indicator when drag-and-drop of a component is not allowed.

#### Admin Tools
- Fixed [#13](https://github.com/websight-io/starter/issues/13) - updated keyboard shortcut for script execution.

#### Other
- Improved UX for the list of spaces.
- Improved UX for the modal to move/copy pages.

## 1.5.0 <small>December 7, 2022</small>

#### Page Editor
- Improved the placeholder text for empty containers to guide users on how to add components.
- Fixed issues with overlays for components.
- Fixed [#33](https://github.com/websight-io/starter/issues/33) - reduced panel size leads to cropped images thumbnails.
- [Path picker](/docs/developers/development/dialogs/pathpicker/) input field:
    - Fixed [#19](https://github.com/websight-io/starter/issues/19) - updated placeholder text to guide on how to choose a path.
    - Added an arrow to expand the dropdown for selection.
    - Fixed an issue with the _rootPath_ property.

## 1.4.0 <small>November 23, 2022</small>

#### Page Editor
- Added ability to drag-and-drop a component between others included in a container.
- Added [#22](https://github.com/websight-io/starter/issues/22) - scrolling the page to a component when the user clicks it in the content tree.
- Improved UX for the component list. It contains only items allowed for a given page (based on its template).
- Fixed an issue with misaligned overlays when the user resized the window.

#### Page and Asset Management
- Added actions in the breadcrumb for assets.
- Added _Edit_ action in the breadcrumb for pages.
- Fixed an issue with page creation when the action was interrupted previously.

#### Other
- Added loading indicator for the _Create Space_ modal.

## 1.3.0 <small>November 09, 2022</small>

#### Page Editor

- Fixed an issue with component drag-and-drop - in some cases component can't be dropped on a selected container.
- Fixed an issue with the editor layout caused by a faulty component included on a page. 

#### Page and Asset Management

- Fixed [#26](https://github.com/websight-io/starter/issues/26) - asset preview dropdown is cut off and has no icons.

#### Other

- Improved UX for the Create Space modal.
- Added keyboard shortcuts for all modals - submitting changes with _Enter_/_Return_ and cancelation with _Esc_, _X_ icon or clicking outside of the modal.

## 1.2.0 <small>October 26, 2022</small>

#### Page Editor

- Improved UX for components drag-and-drop - indicating if the drop is not allowed.
- Fixed the issue for the [Asset Reference](../../developers/development/dialogs/assetreference/) input field - impossible to remove image and save empty value.

#### Page and Asset Management

- Improved messages for asset publication.
- Fixed the page and assets tree refresh when the current space switched.

#### Admin Tools

- Fixed [#14](https://github.com/websight-io/starter/issues/14) and [#16](https://github.com/websight-io/starter/issues/16) - removed the artificial footer for Package Manager, User Manager, Groovy Console and Swagger Browser.


## 1.1.0 <small>October 11, 2022</small>

#### Page Editor

- Fixed the component dragging indicator.

#### Page and Asset Management

- Improved assets publication. Publish and unpublish actions include assets in sub-folders. 
- Fixed [#24](https://github.com/websight-io/starter/issues/24): assets download has no effect.
- Fixed the hidden top bar with actions for pages and assets (when scrolling).

#### Other

- Added HTL cache cleanup after deployment of bundles.




## 1.0.0 <small>September 28, 2022</small>

First public release of the WebSight CMS Community Edition.
[See our blog post](../../../blog/2022/websight-cms-ce-1-0-0/)
