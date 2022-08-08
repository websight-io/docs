# Image component

## Usage
Drag & drop image component to a Page section. You will see a default image placeholder. (It is visible in edit mode only.)
<p align="center" width="100%">
    <img class="image--with-border" src="./placeholder.jpg" alt="Image placeholder in edit mode">
</p>

## Authorable properties
Click "Edit" icon to see all image component's properties:

- You can open the left **assets panel** and drag & drop an image to the **L breakpoint** asset section. If only the **L breakpoint** asset is provided, an __img__ html tag will be rendered with the provided image on all breakpoints. (See [breakpoints definition](../grid#breakpoints-definition) for L, M, S breakpoints width)

- If additionally the **M breakpoint** asset is provided, a __picture__ html tag will be rendered and M asset will be used on M and S breakpoints.
- If additionally the **S breakpoint** asset is provided, a __picture__ html tag will be rendered and S asset will be used on S breakpoint
- Please note that only the **L breakpoint** is required for an image to be rendered on a published page. M and S assets are optional.
- You can additionally provide an alternative text (alt) to describe the image. Leave it blank only when the image is purely decorative.
- Optionally you can wrap the image in a link

<p align="center" width="100%">
    <img class="image--with-border" src="./dialog.jpg" alt="Image dialog">
</p>

## Rendered component
If you add an image that is wider than image container, it will have the container width and height respecting the asset ratio. You can see an example of an image with 12 columns width below:

<p align="center" width="100%">
    <img class="image--with-border" src="./12-col-img.jpg" alt="Image: 12 cols example">
</p>

You can resize the image container by using the grid options in the layout tab of authoring dialog (See [grid](../grid) description for details).
You can see an example of 2-columns-wide image below. Image is shrinked to 2 columns width, and it's height respects the orginal asset ratio.

<p align="center" width="100%">
    <img class="image--with-border" src="./2-col-img.jpg" alt="Image: 2 cols example">
</p>

## Additional notes
Wen an asset has been deleted and the path to image is no longer valid, a broken icon of an image will be displayed in editor:

<p align="center" width="100%">
    <img class="image--with-border" src="./broken-path.jpg" alt="Broken path icon">
</p>
