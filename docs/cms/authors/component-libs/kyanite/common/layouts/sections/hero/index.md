# Hero

_Since_: 0.4.19

[//]: # (TODO add component groups info)

Hero section is a ready-to-use component to appear as the first part of each page to make first
impressions. Also, there is a small description included with a button to take action.

## Usage

Drag & drop Hero component from Kyanite Sections to the page directly, as the component already
contains a Section component.
After adding it to the page, it should look like this:
<p align="center" width="100%">
    <img class="image--with-border" src="_images/initial-hero.png" alt="Initial Hero">
</p>

## Authorable properties

As the component is not a standalone component, and it wraps various other components, authoring
can be done through those basic components. Here is the structure of the authorable components:

- <a href="../../../components/section">Section</a>
    - <a href="../../../components/container">Container</a>
        - <a href="../../../components/title">Title</a>
          - <a href="../../../components/columns">Columns</a>
              - <a href="../../../components/columns/column">Single Column</a>
                  - <a href="../../../components/content">Content</a>
          - <a href="../../../components/buttons">Buttons</a>
              - <a href="../../../components/button">Button</a>