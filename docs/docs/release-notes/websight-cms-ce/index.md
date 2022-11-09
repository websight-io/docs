# WebSight CMS Community Edition Release Notes

## 1.3.0 <small>November 09, 2022</small>

- Improved Create Space Modal.
- Improved UX of all modals in the system: handling keyboard shortcuts (Enter, Escape), closing using ‘X’ icon, closing when clicking outside of modal.
- Fixed [#26](https://github.com/websight-io/starter/issues/26) - Asset preview dropdown is cut off and has no icons.
- In Page Editor:
    - Ensured proper handling of components included in other components
    - Fixed the issue, when component couldn’t have been dropped on selected container.
    - Improved error handling: blocked a possibility to include new WebSight CMS instance inside of Page Editor.

## 1.2.0 <small>October 26, 2022</small>

- Improved UX for components drag & drop in the page editor - indicating if the drop is not allowed.
- Improved messages for asset publication.
- Fixed [#14](https://github.com/websight-io/starter/issues/14) and [#16](https://github.com/websight-io/starter/issues/16) - removed the artificial footer for Package Manager, User Manager, Groovy Console and Swagger Browser.
- Fixed the issue for the [Asset Reference](../../developers/development/dialogs/assetreference/) input field - impossible to remove image and save empty value.
- Fixed the page and assets tree refresh when the current space switched.


## 1.1.0 <small>October 11, 2022</small>

- Added HTL cache cleanup after deployment of bundles.
- Improved assets publication. Publish and unpublish actions include assets in sub-folders. 
- Fixed [#24](https://github.com/websight-io/starter/issues/24): assets download has no effect.
- Fixed the hidden top bar with actions for pages and assets (when scrolling).
- Fixed the component dragging indicator in the page editor.

## 1.0.0 <small>September 28, 2022</small>

First public release of the WebSight CMS Community Edition.
[See our blog post](../../../blog/2022/websight-cms-ce-1-0-0/)