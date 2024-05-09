# CTA

_Since_: 0.4.19

CTA section is a ready-to-use component to capture the attention of the users and provide
a button to take action.

## Usage

Drag & drop CTA component from Kyanite Sections to the page directly, as the component already
contains a Section component.
After adding it to the page, it should look like this:
<p align="center" width="100%">
    <img class="image--with-border" src="images/initial-cta.png" alt="Initial CTA">
</p>

## Authorable properties

As the component is not a standalone component, and it wraps various other components, authoring
can be done through those basic components. Here is the structure of the authorable components:
- <a href="../../section">Section</a>
  - <a href="../../container">Container</a>
    - <a href="../../title">Title</a>
    - <a href="../../buttons">Buttons</a>
      - <a href="../../button">Button</a>