# Grid

_Since_: 0.4.21

Grid is a two-dimensional container similar to <a href="https://bulma.io/documentation/grid/fixed-grid/">Bulma Grid</a>

## Usage

Drag and drop Grid to a page section. It will initially have four Grid cells in it:

<p align="center" width="100%">
    <img class="image--with-border" src="_images/grid/grid-initial.png" 
         alt="grid-initial">
</p>

You can drag and drop Grid cells into Grid.

<p align="center" width="100%">
    <img class="image--with-border" src="_images/grid/grid-components.png" 
         alt="grid-components">
</p>

You can drag and drop any content into Grid cells.

## Authorable properties

### Grid

Grid has the following properties:

- Columns number for different viewports (desktop/tablet/mobile) - defines width of the Grid.
Try to input different values and switch between viewports to see the difference.

<p align="center" width="100%">
    <img class="image--with-border" src="_images/grid/grid-columns-number-desktop.png" 
         alt="grid-columns-number-desktop">
</p>

<p align="center" width="100%">
    <img class="image--with-border" src="_images/grid/grid-columns-number-tablet.png" 
         alt="grid-columns-number-tablet">
</p>

<p align="center" width="100%">
    <img class="image--with-border" src="_images/grid/grid-columns-number-mobile.png" 
         alt="grid-columns-number-mobile">
</p>

- Column gap and Row gap - space between columns/rows, in _rem_. 
Allowed bounds are from 0 to 8, with step of 0.5

<p align="center" width="100%">
    <img class="image--with-border" src="_images/grid/grid-gaps.png" 
         alt="grid-gaps">
</p>

### Grid cell

You can change width and height of a cell relatively to Grid:

<p align="center" width="100%">
    <img class="image--with-border" src="_images/grid-cell/grid-cell-size.png" 
         alt="grid-cell-size">
</p>

Please notice that, if cell doesn't fit in place, it will be moved to the next row.
On the screenshot above, Cell 4 was pushed to a second row by cell 3, then to the third column by Cell 2. 
