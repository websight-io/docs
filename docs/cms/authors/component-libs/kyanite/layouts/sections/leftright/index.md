# Left-right

_Since_: 0.4.19

Left-right section is a ready-to-use component split into two parts, an image is shown on the
left-hand side while a title and a description can be found on the right-hand side.

## Usage

Drag & drop Left-right component from Kyanite Sections to the page directly, as the component already
contains a Section component.
After adding it to the page, it should look like this:
<p align="center" width="100%">
    <img class="image--with-border" src="_images/initial-leftright.png" alt="Initial Left-right">
</p>

## Authorable properties

As the component is not a standalone component, and it wraps various other components, authoring
can be done through those basic components. Here is the structure of the authorable components:

- <a href="../../../components/section">Section</a>
    - <a href="../../../components/container">Container</a>
        - <a href="../../../components/columns">Columns</a>
            - <a href="../../../components/columns/column">Single Column</a>
                - <a href="../../../components/image">Image</a>
            - <a href="../../../components/columns/column">Single Column</a>
                - <a href="../../../components/title">Title</a>
                  - <a href="../../../components/content">Content</a>