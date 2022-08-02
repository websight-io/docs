# Image Component

## Usage
Drag & drop image component to a Page section. You will see a default image placeholder. (It is visible in edit mode only.)
![Image placeholder](placeholder.jpg "Image placeholder in edit mode")

## Authorable properties
Click "Edit" icon to see all image component's properties:

- You can open the left **assets panel** and drag&drop an image to the **L breakpoint** asset section. If only **L breakpoint** asset is provided, and __img__ html tag will be rendered with the provided image on all breakpoints. (See [breakpoints definition](../grid#breakpoints-definition) for L, M, S breakpoints width)

- If additionally **M breakpoint** asset is provided, a __picture__ html tag will be rendered and M asset will be used on M and S breakpoints.
- If additionally **S breakpoint** asset is provided, a __picture__ html tag will be rendered and S asset will be used on S breakpoint
- Please note that only **L breakpoint** is required for an image to be rendered on published page. M and S assets are optional.
- You can additionally provide an alternative text (alt) to describe image. Leave it blank only when image is purely decorative.
- Optionally you can wrap the image in a link

<p align="center" width="100%">
    <img src="./dialog.jpg" alt="Image dialog">
</p>

## Rendered component
If you add an image that is wider then image container, it will have the container width and height respecting the asset ratio. You can see an example of an image with 12 columns width below:

<p align="center" width="100%">
    <img src="./12-col-img.jpg" alt="Image: 12 cols example">
</p>

You can resize the image container by using the grid options in the layout tab of authoring dialog (See [grid](../grid) description for details).
You can see an example of 2-columns-wide image below:

<p align="center" width="100%">
    <img src="./2-col-img.jpg" alt="Image: 2 cols example">
</p>

## Additional notes
Wen an asset has been deleted and the path to image is no longer valid, a broken icon of an image will be displayed in editor:

<p align="center" width="100%">
    <img src="./broken-path.jpg" alt="Broken path icon">
</p>
