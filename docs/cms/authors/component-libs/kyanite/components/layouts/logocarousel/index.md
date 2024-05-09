# Logo Carousel

_Since_: 0.4.19

Logo Carousel section is a ready-to-use component where following a title and a description,
authors can showcase a selection of logos with logo names.

## Usage

Drag & drop Logo Carousel component from Kyanite Sections to the page directly, as the
component already contains a Section component.
After adding it to the page, it should look like this:
<p align="center" width="100%">
    <img class="image--with-border" src="images/initial-logocarousel.png" alt="Initial Logo Carousel">
</p>

## Authorable properties

As the component is not a standalone component, and it wraps various other components, authoring
can be done through those basic components. Here is the structure of the authorable components:
- <a href="../../section">Section</a>
  - <a href="../../container">Container</a>
    - <a href="../../title">Title</a>
      - <a href="../../columns">Columns</a>
        - <a href="../../columns/column">Single Column</a>
          - <a href="../../content">Content</a>
      - <a href="../../level">Level</a>
        - <a href="../../level/levelitem">Level item</a>
          - <a href="../../container">Container</a>
            - <a href="../../image">Image</a>
            - <a href="../../content">Content</a>
        - <a href="../../level/levelitem">Level item</a>
          - <a href="../../container">Container</a>
            - <a href="../../image">Image</a>
            - <a href="../../content">Content</a>
        - <a href="../../level/levelitem">Level item</a>
          - <a href="../../container">Container</a>
            - <a href="../../image">Image</a>
            - <a href="../../content">Content</a>