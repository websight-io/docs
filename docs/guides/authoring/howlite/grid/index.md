# Grid

## Resize options
Almost all components in Howlite can be resized (inside a [Page section component](../page-section)).
In order to resize an [Image](../image) or [Container](../container) click "Edit" icon for the selected component and open the "Layout" tab in the dialog.

<p align="center" width="100%">
    <img class="image--with-border" src="./resize.jpg" alt="Grid options" width="500px">
</p>

For each breakpoint separately, you can control:

  - the **Start** property: for example, if you set it to "2 Column" on L breakpoint, the component will start from the second column on desktop.
  - the **Width** property: for example, if you set it to "6 Columns" on L breakpoint, the component will be 6 columns wide on desktop.

The above settings will result in the following container size and position:

<p align="center" width="100%">
    <img class="image--with-border" src="./container-resized.jpg" alt="Resized container">
</p>

## Breakpoints definition

Across the Howlite projects the following breakpoints are used:

- **L Breakpoint**: 970px and above
- **M Breakpoint**: 768px - 969px
- **S Breakpoint**: 0 - 767px

## Additional notes

In Howlite the following components intentionally don't have "resize" options:

- [CTA](../cta) - buttons width depends only on its label width
- [Page Section](../page-section) - it's always 12 columns wide in Howlite (but you can resize a container inside if needed)