# WebSight CMS Release Notes

## 1.7.0 <small>January 18, 2023</small>

#### Page Editor
- Added ability to refresh the workspace on component changes.
- Fixed the issues with misaligned overlays on component changes.
- Fixed the issues with `vh` styles in the _edit mode_.
- Fixed the issue with additional space generated at the end of the workspace after zoom-in and zoom-out.

#### Page and Asset Management

- Fixed [#25] - SVG files are displayed properly now.

### Dialogs

- Fixed the issue for the [Date Picker](../../developers/development/dialogs/date-picker/) input field - presented a wrong value.
- Fixed the issue on pressing _enter_ - didn't close a modal in some cases.


#### Admin Tools
- Fixed [#12] -  updated layout of the landing page for Admin Tools.

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
