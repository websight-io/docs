# Social Proof Card

_Since_: 0.4.19

[//]: # (TODO add component groups info)

_Social Proof Card_ section is a ready-to-use component that is designed for the authors to be
able to extend the <a href="../socialproof">Social Proof</a> section with additional proofs.

## Usage

Drag & drop _Social Proof Card_ component from Kyanite In-Text Sections to a Carousel Item component
inside a previously placed Social Proof section.
After adding it to the carousel, it should look like this:
<p align="center" width="100%">
    <img class="image--with-border" src="_images/initial-soacialproofitem.png" alt="Initial Social Proof Item">
</p>

## Authorable properties

As the component is not a standalone component, and it wraps various other components, authoring
can be done through those basic components. Here is the structure of the authorable components:

- <a href="../../../components/card">Card</a>
    - <a href="../../../components/card/cardcontent">Card Content</a>
        - <a href="../../../components/mediaobject">Media Object</a>
            - <a href="../../../components/mediaobject/medialeft">Media Left</a>
                - <a href="../../../components/image">Image</a>
            - <a href="../../../components/mediaobject/mediacontent">Media Content</a>
                - <a href="../../../components/content">Content</a>
            - <a href="../../../components/mediaobject/mediaright">Media Right</a>
        - <a href="../../../components/content">Content</a>
