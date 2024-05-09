# Banner

_Since_: 0.4.19

Banner section is a ready-to-use component to capture the attention of the users and provide
navigation options.

## Usage

Drag & drop Banner component from Kyanite Sections to the page directly, as the component already
contains a Section component.
After adding it to the page, it should look like this:
<p align="center" width="100%">
    <img class="image--with-border" src="images/initial-banner.png" alt="Initial Banner">
</p>

## Authorable properties

As the component is not a standalone component, and it wraps various other components, authoring
can be done through those basic components. Here is the structure of the authorable components:
- <a href="../../section">Section</a>
  - <a href="../../container">Container</a>
    - <a href="../../card">Card</a>
      - <a href="../../card/cardcontent">Card content</a>
        - <a href="../../title">Title</a>
          - <a href="../../container">Container</a>
            - <a href="../../level">Level</a>
              - <a href="../../level/levelitem">Level item</a>
                - <a href="../../link">Link</a>
              - <a href="../../level/levelitem">Level item</a>
                - <a href="../../link">Link</a>