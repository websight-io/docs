# WebSight CMS Community Edition Release Notes

## 1.4.0 <small>November 23, 2022</small>

#### Page Editor
- Improved UX - ability to drag and drop a component between others included in a container.
- Improved UX - component list contains only items allowed for a given page (based on its template).
- Improved UX [#22](https://github.com/websight-io/starter/issues/22) - scrolling the page to a component when the user clicks it in the content tree.
- Fixed an issue with misaligned overlays when the window resized.

#### Page and Asset Management
- Added actions in the breadcrumb for assets.
- Added _Edit_ action in the breadcrumb for pages.
- Fixed an issue with page creation when the action was interrupted previously.

#### Other
- Added loading indicator for the _Create Space_ modal.

## 1.3.0 <small>November 09, 2022</small>

#### Page Editor

- Fixed an issue with component drag & drop - in some cases component can't be dropped on a selected container.
- Fixed an issue with the editor layout caused by a faulty component included on a page. 

#### Page and Asset Management

- Fixed [#26](https://github.com/websight-io/starter/issues/26) - asset preview dropdown is cut off and has no icons.

#### Other

- Improved UX for the Create Space modal.
- Added keyboard shortcuts for all modals - submitting changes with _Enter_/_Return_ and cancelation with _Esc_, _X_ icon or clicking outside of the modal.

## 1.2.0 <small>October 26, 2022</small>

#### Page Editor

- Improved UX for components drag & drop - indicating if the drop is not allowed.
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
