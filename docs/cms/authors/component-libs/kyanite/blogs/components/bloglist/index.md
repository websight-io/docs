# Blog list

_Since:_ 0.0.4

[//]: # (TODO add component groups info)

Blog list allows you to display a grid of blog article previews.

## Usage

Drag & drop Blog list to a Page Section. It will automatically display all blog article previews it will find. 

The set of articles to be displayed depends on the type of the page Blog List belongs to:
- on pages that belong to a specific author, i.e. <a href="../../authorinfo#config">with author info configured</a>, it will filter articles by author:
<p align="center" width="100%">
    <img src="./_images/bloglist-editmode-initial-by-author.png"
         alt="Blog list initial state filtered by author">
</p>

- on all other pages it will display all the articles under the same space as the page
<p align="center" width="100%">
    <img src="./_images/bloglist-editmode-initial-by-space.png"
         alt="Blog list initial state filtered by space">
</p>

## Authorable properties

Click <img class="image--inline" src="../../../_images/edit-icon.png" alt="Edit icon"> ("Edit" icon).

- **Path to the blog article pages** - defines the root under which blog articles pages will be searched.
When the property is empty, space root will be used.
- **Source of author info** - allows you to filter articles by author. 
If no valid author is referenced directly or via parent page, it will have no effect.
<p align="center" width="100%">
    <img src="./_images/bloglist-dialog.png"
         alt="Blog list initial state filtered by space">
</p>

## Rendered component

Blog list looks different on wide and narrow viewports.

On desktop, it's a grid with three articles per line:

<p align="center" width="100%">
    <img src="./_images/bloglist-preview-desktop.png"
         alt="Blog list preview desktop">
</p>

On tablet/mobile every article takes all the component's width:

<p align="center" width="100%">
    <img src="./_images/bloglist-preview-mobile.png"
         alt="Blog list preview desktop">
</p>
