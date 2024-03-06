# WebSight CMS release notes

## 1.24.0 <small>Feb 28, 2024</small>

**Page and Asset Management**

- Added Reference Search functionality for moving ans renaming pages and assets.
- Fixed the issue with the remove action not working on newly created assets.

**Page Editor**

- Added a preview mode for users with read-only access in the page editor.
- Improved the drag-and-drop functionality within the content tree.
- Fixed text alignment issues on checkbox buttons.

**Resource Browser**

- Fixed issues with displaying properties and the list of resources correctly.

**Dialogs**

- Fixed text wrapping for labels in radio button options.
- Fixed issues with copying values while adding rows to multifields.


## 1.23.0 <small>Dec 5, 2023</small>

**Page Editor**

- Added validation to user rights for toolbar actions.
- Improved performance in save action in page editor.
- Improved performance on drag-and-drop functionality within content tree.

## 1.22.0 <small>Nov 6, 2023</small>

**Page Management**

- Fixed the extra loading state display.
- Fixed jumping resource selector in the content tree.

**Page Editor**

- Added multiple viewport support.
- Improved hierarchy levels representation in the content tree.
- Improved drag-and-drop reordering components in the content tree.
- Fixed [#139](https://github.com/websight-io/starter/issues/179) possibility of dropping component into ancestors of an empty containers.
- Fixed element selectors alignment.

## 1.21.2 <small>Oct 13, 2023</small>

**Page Editor**

- Fixed component drag-and-drop performance issues.

## 1.21.1 <small>Oct 10, 2023</small>

**Page Editor**

- Fixed page scrolling to the top after any update.

## 1.21.0 <small>Oct 4, 2023</small>

**Page and Asset Management**

- Fixed the invisible last-row actions when the table has many items.  
- Fixed flickering loading state in the page and assets trees.

**Page Editor**

- Added direct component reordering in the content tree.
- Improved drag-and-drop for containers.
- Improved switching between edit and preview modes - page position in the workspace remains the same now.
- Fixed the _unexpected error_ notification after changing page properties in the preview mode.
- Fixed the outdated publication status after inline editing.

**Admin tools**

- Added advanced options for package installation during upload.

**Other**

- Fixed broken link to the terms of use on the login page.
- Removed browser-based field validation messages as they duplicate the ones from CMS.


## 1.20.1 <small>Sep 21, 2023</small>

**Page and Asset Management**

- Fixed [#179](https://github.com/websight-io/starter/issues/179) - the broken preview of a selected asset.
- Fixed the lack of an icon for the page action _view as published_.

**Page Editor**

- Improved UX for version management - added a dedicated icon on the top bar.

## 1.20.0 <small>Sep 13, 2023</small>

**Page and Asset Management**

- Added an action to view a page as published before its publication.
- Improved the move action - added a step to rename a page, an asset, or a folder as a part of the action.
- Added loading states for the page tree and the asset tree.
- Added drag-and-drop support for asset upload.
- Improved UX for uploading the same assets again - simplified dialog options.

**Page Editor**

- Added an ability to view a page as published before its publication [#98](https://github.com/websight-io/starter/issues/98).
- Fixed the right-side panel refresh after a user clears a property in a dialog.
- Fixed missing trailing new lines in the rich text editor input field in the right side panel.

**Admin tools**

- Fixed the ability to re-upload a package in the package manager when the override option is not selected.
- Fixed the download link for binary JCR properties in the resource browser.

## 1.19.0 <small>Aug 23, 2023</small>

**Page and Asset Management**

- Added skeleton for the general tab.
- Added clearing the section in the dashboard table by escape button.

**Page Management**

- Added the possibility to see "ghost" pages.
- Added the possibility to unpublish "ghost" pages.

**Groovy Console**

- Fixed help content: presenting content with code examples.

**Page Editor**

- Improved listing available components:
  - overlayed components (with the same resource type) are listed just once,
  - components with the same name but different types have additional information about type.
  
**Package Manager**

- Fixed uninstalling packages.

**Resource Browser**

- Fixed saving many resources positions changes at once.

## 1.18.0 <small>Aug 2, 2023</small>

**Page and Asset Management**

- Removed the information about the size for the selected folder(s) as it is unavailable.
- Added an ability to copy a JCR path(s) for selected pages and assets.
- Improved UX for filtering - an action execution doesn't clear user-defined criteria.
- Fixed visibility of the last row actions when a table has a lot of items.
- Fixed an issue with page creation when a user doesn't provide a unique name.
- Fixed the "Cannot get actions" warning when a user deleted or moved a page using the top bar actions.
- Fixed the return to template selection when creating a new page and providing its properties.
- Fixed the name generation for a new page when a user adjusted the name for a previous page.
- Improved updating of the last modification date for pages and assets.

**Page versioning**

- Added confirmation message before restoring a page version.
- Added time to creation date presented in the versions table.

**Page Editor**

- Added loading states for
    - the workspace, when its content requires refreshing,
    - starting inline editing for the [Rich Text Editor](/cms/developers/dialogs/richtext-editor/),
    - the publication status dropdown.
- Added workspace refresh after page properties updates.
- Fixed drag-and-drop of a component close to the left border of a container.
- Fixed disappearing "Drag components here" placeholder for containers included in many page sections.

**Admin tools**

- Fixed UI issues in the package manager when a user selects advanced options during installation.
- Fixed text overlap issues in the resource browser when a user expands a property with a long value.
- Fixed the cursor landing at the end of the text when editing a property in the resource browser.
- Fixed paths presented in the swagger view.

**Dialogs**

- Fixed the position of the date picker modal when it is the first input field in a dialog.

## 1.17.0 <small>Jul 11, 2023</small>

**Page Versioning**

- Added page versioning feature to the Page editor
  - Added possibility to create page version manually
  - Added functionality to create page version automatically on page publishing
  - Added possibility to drop unpublished changes

**Spaces**

- Added possibility to edit space properties
- Fixed issue related to breaking dashboard layout when description is too long

**Page and Asset Management**

- Added loading states for topbar and table actions
- Fixed scalability for dashboards
- Fixed validation error message if folder or page already exists
- Fixed loading tree when editor closed by back button in the browser
  
**Page Management**

- Fixed taking into account allowed children restrictions when copying and moving pages

**Page Editor**

- Added blocking when action is in progress

**Groovy Console**

- Fixed code snippets in the help panel
  
**Dialogs**

- Added red highlight on the tab when contains validation error
- Removed support for default values

## 1.16.0 <small>Jun 14, 2023</small>

**Page and Asset Management**

- Fixed asset types presented on the list of assets.
- Improved the loading state for the list of pages. 
- Improved refreshing of the list of pages after action execution.

**Page Editor**

- Fixed additional corner cases for the issue with `vh` styles in the _edit mode_. 
- Fixed an issue with shifted workspace when an author expands a dropdown in the side panel.

## 1.15.0 <small>May 30, 2023</small>

**Page and Asset Management**

- Fixed the publication status for new pages created as a copy.
- Removed the publication status for folders.

**Page Editor**

- Added an ability to update the page properties directly in the editor.
- Improved the loading state for the side panel when a user selects a component for the first time.

**Dialogs**

- Fixed the visibility of fields that depend on a default value of the select input field.

**Admin tools**

- Fixed the issue with inserting an empty resource name while creating a new item.
- Fixed the issue for creating new items in the Resource Browser - the resource name can't be empty now. 
- Fixed [#158](https://github.com/websight-io/starter/issues/158) - the issue with the resource path input.

**Other**

-  Changed the API and implementation of the publishing framework. Pushing the published content to the file system works as before but will be changed to [a request-replay approach](https://www.websight.io/blog/2023/new-publishing-framework.html) in the next release.

## 1.14.0 <small>May 10, 2023</small>

**Page Editor**

- Improved UX for inline editing. Authors can start the action using double-click (if configured as a [default action](/cms/developers/components/#default-action) for a given component).
- Added a skeleton screen for the workspace while it is loading.                                            

**Dialogs**

- Fixed [#159](https://github.com/websight-io/starter/issues/159) - saving a multifield by a modal and the side panel leads to conflicts.

**Admin tools**

- Fixed the issue with providing a resource name while creating a new item.

**Other**

- Updated [Howlite](/cms/authors/component-libs/howlite/) components (RTE, Title, Quote, CTA) - removed the mandatoriness of fields having an initial content.

## 1.13.0 <small>April 19, 2023</small>

**Page Editor**

- New feature from the roadmap [#1](https://github.com/websight-io/roadmap/issues/1) - added inline editing for text input fields.
- Improved UX for keyboard shortcuts to copy and paste components - selection keeps the focus on the workspace (no autofocus on the first editable field in the right side panel).

## 1.12.0 <small>March 29, 2023</small>

**Page Editor**

- Added keyboard shortcuts to copy, cut and paste components.

**Components**

- Added the [ability to define items reloaded after a component is updated by the author](/cms/developers/components/#reload-on-update).

**Dialogs**

- Changed and extended _Rich Text Editor_ [configuration options](/cms/developers/dialogs/richtext-editor/configuration/#using-configuration).

**Other**

- Fixed the blinking space icons and space types on load.
- Fixed the size of the clickable area for item selection on the list of pages and assets.

## 1.11.2 <small>March 23, 2023</small>

**Page Editor**

- Fixed the lack of refresh for the side panel with component properties after the user updated them in the modal.

**Dialogs**

- Fixed modal closing with _ESC_ button after changing a tab.

## 1.11.1 <small>March 21, 2023</small>

**Page Editor**

- Fixed blinking component selection and toolbar after changing component properties in the side panel.
- Improved selected component loading state after changing component properties in the side panel.
- Fixed the lack of component selection after changing component properties in the modal.

**Dialogs**

- Fixed [#63](https://github.com/websight-io/starter/issues/63) and [#149](https://github.com/websight-io/starter/issues/149) - [toggle](/cms/developers/dialogs/toggle/), [select](/cms/developers/dialogs/select/), [checkbox](/cms/developers/dialogs/checkbox/), [radio](/cms/developers/dialogs/radio/), [rich text editor](/cms/developers/dialogs/richtext-editor/), and [text area](/cms/developers/dialogs/text-area/) work right in the [multifield](/cms/developers/dialogs/multifield/) now. Additionally, the description for the input field included in the multifield is presented on hover.


## 1.11.0 <small>March 15, 2023</small>

**Page Editor**

- New feature from the roadmap [#2](https://github.com/websight-io/roadmap/issues/2) - added the side panel with component properties.
- Improved workspace refresh after edit action  - only the updated component is reloaded now.
- Added [#140](https://github.com/websight-io/starter/issues/140) - the ability to set WCM mode in HTL.
- Improved UX for concurrent assets management - opening the list of assets from the assets panel in the page editor. 

## 1.10.0 <small>March 1, 2023</small>

**Page and Asset Management**

- Fixed crash when a user uploads multiple assets at the same time.
- Fixed broken list of pages for a space when its first node in the resource browser contains an object other than pages, for example, policies.
- Fixed blinking space dropdown when a user removed a space, and not available anymore.
- Fixed [#133](https://github.com/websight-io/starter/issues/133) - page name generated from the tile is lowercase now.
- Improved [#15](https://github.com/websight-io/starter/issues/15) - clicking a page name opens the page editor now.
- Improved the expandable panel with the tree on the left - added icons for pages and folders.
- Improved the preview of assets containing white objects on a transparent background (changed preview background to grey).

**Admin tools**

- Fixed page reordering in the resource browser.
- Fixed the broken order of pages after re-creating the content from JCR vault package in the _Package Manager_.
- Fixed the missing icon for the _deny_ permission in the user manager. 

**Dialogs**

- Fixed an issue with closing the [Button Dropdown](/cms/developers/dialogs/richtext-editor/ui-components/button-dropdown/) for the [Rich Text Editor](/cms/developers/dialogs/richtext-editor/).

**Other**

- Fixed inconsistency of a new space name generated from the title.
- Fixed an issue with loading the manifest file by a browser.

## 1.9.1 <small>February 15, 2023</small>

**Page Editor**

- Improved the style for the page publication status dropdown.

**Page and Asset Management**

- Fixed the lack of scroll when returning from the page editor.

**Admin tools**

- Fixed the issue with renaming nodes in the resource browser.
- Fixed the issue with saving changes in the resource browser. 
- Unified action buttons order for dialogs.

**Other**

- Fixed the issue with entering _Title_ and _Name_ for a new space - changing the value moves the cursor to the end of the fields.

## 1.8.0 <small>February 1, 2023</small>

**Page Editor**

- Fixed the misaligned cursor and component during drag-and-drop (Chrome).

**Other**

- Updated paddings for the lists of spaces, pages, and assets.
- Fixed the scroll for the list of pages and assets - always visible even when there was no need.
- Improved stability of front-end tests (Cypress).

## 1.7.0 <small>January 18, 2023</small>

**Page Editor**

- Added ability to refresh the workspace on component changes.
- Fixed the issues with misaligned overlays on component changes.
- Fixed the issues with `vh` styles in the _edit mode_.
- Fixed the issue with additional space generated at the end of the workspace after zoom-in and zoom-out.

**Page and Asset Management**

- Fixed [#25](https://github.com/websight-io/starter/issues/25) - SVG files are displayed properly now.

**Dialogs**

- Fixed the issue for the [Date Picker](../../developers/dialogs/date-picker/) input field - presented a wrong value.
- Fixed the issue on pressing _enter_ - didn't close a modal in some cases.


**Admin Tools**

- Fixed [#12](https://github.com/websight-io/starter/issues/12) -  updated layout of the landing page for Admin Tools.

**Other**

- Unified UX for the left side panel for all views.


## 1.6.0 <small>December 21, 2022</small>

**Page Editor**

- Improved collapsing and expanding of the left side panel.
- Fixed the lack of the scroll for page preview.
- Fixed the missing indicator when drag-and-drop of a component is not allowed.

**Admin Tools**

- Fixed [#13](https://github.com/websight-io/starter/issues/13) - updated keyboard shortcut for script execution.

**Other**

- Improved UX for the list of spaces.
- Improved UX for the modal to move/copy pages.

## 1.5.0 <small>December 7, 2022</small>

**Page Editor**

- Improved the placeholder text for empty containers to guide users on how to add components.
- Fixed issues with overlays for components.
- Fixed [#33](https://github.com/websight-io/starter/issues/33) - reduced panel size leads to cropped images thumbnails.
- [Path picker](/cms/developers/dialogs/pathpicker/) input field:
    - Fixed [#19](https://github.com/websight-io/starter/issues/19) - updated placeholder text to guide on how to choose a path.
    - Added an arrow to expand the dropdown for selection.
    - Fixed an issue with the _rootPath_ property.

## 1.4.0 <small>November 23, 2022</small>

**Page Editor**

- Added ability to drag-and-drop a component between others included in a container.
- Added [#22](https://github.com/websight-io/starter/issues/22) - scrolling the page to a component when the user clicks it in the content tree.
- Improved UX for the component list. It contains only items allowed for a given page (based on its template).
- Fixed an issue with misaligned overlays when the user resized the window.

**Page and Asset Management**

- Added actions in the breadcrumb for assets.
- Added _Edit_ action in the breadcrumb for pages.
- Fixed an issue with page creation when the action was interrupted previously.

**Other**

- Added loading indicator for the _Create Space_ modal.

## 1.3.0 <small>November 09, 2022</small>

**Page Editor**

- Fixed an issue with component drag-and-drop - in some cases component can't be dropped on a selected container.
- Fixed an issue with the editor layout caused by a faulty component included on a page. 

**Page and Asset Management**

- Fixed [#26](https://github.com/websight-io/starter/issues/26) - asset preview dropdown is cut off and has no icons.

**Other**

- Improved UX for the Create Space modal.
- Added keyboard shortcuts for all modals - submitting changes with _Enter_/_Return_ and cancelation with _Esc_, _X_ icon or clicking outside of the modal.

## 1.2.0 <small>October 26, 2022</small>

**Page Editor**

- Improved UX for components drag-and-drop - indicating if the drop is not allowed.
- Fixed the issue for the [Asset Reference](../../developers/dialogs/assetreference/) input field - impossible to remove image and save empty value.

**Page and Asset Management**

- Improved messages for asset publication.
- Fixed the page and assets tree refresh when the current space switched.

**Admin Tools**

- Fixed [#14](https://github.com/websight-io/starter/issues/14) and [#16](https://github.com/websight-io/starter/issues/16) - removed the artificial footer for Package Manager, User Manager, Groovy Console and Swagger Browser.


## 1.1.0 <small>October 11, 2022</small>

**Page Editor**

- Fixed the component dragging indicator.

**Page and Asset Management**

- Improved assets publication. Publish and unpublish actions include assets in sub-folders. 
- Fixed [#24](https://github.com/websight-io/starter/issues/24): assets download has no effect.
- Fixed the hidden top bar with actions for pages and assets (when scrolling).

**Other**

- Added HTL cache cleanup after deployment of bundles.

## 1.0.0 <small>September 28, 2022</small>

First public release of the WebSight CMS Community Edition.
[See our blog post](https://www.websight.io/blog/2022/websight-cms-community-edition-100-release.html)
