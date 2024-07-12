# Navbar components

[//]: # (TODO add component groups info)

There are several components that serve as building blocks for Navbar.

Available as Navbar direct children are:

- <a href="#navbar-menu">Navbar menu</a>
- <a href="#navbar-brand">Navbar brand</a>

## <a id="navbar-menu">Navbar menu</a>

Navbar menu represents a container for Navbar start and Navbar end components.

Aside from that, it is possible to add so named 'meta navigation' items that will show at the top ot Navbar menu:

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-menu/navbar-menu-dialog.png" alt="navbar-menu-dialog">
</p>

The result of the configuration above is the following. 
_Item_ here belongs to Navbar end component, while at the top we see two meta navigation items that we've just added.

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-menu/navbar-menu-meta-navigation.png" alt="navbar-menu-meta-navigation">
</p>

### <a id="navbar-start">Navbar start</a> and <a id="navbar-end">Navbar end</a>

Navbar start and Navbar end components are just containers for Navbar menu content. 
They don't have authorable properties.
The only difference is their alignment inside the Navbar menu:

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-menu/navbar-start-end-alignment.png" alt="navbar-start-end-alignment">
</p>

Navbar start and Navbar end can contain Navbar dropdowns or Navbar items.

## <a id="navbar-brand">Navbar brand</a>

Navbar brand component serves as a container for navbar content.

It has a property 'Create navbar burger' that folds Navbar menu on narrow viewports. 
Below is the example.

Wide viewport:

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-brand/navbar-brand-burger-wide.png" alt="navbar-brand-burger-wide">
</p>

Narrow viewport: 

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-brand/navbar-brand-burger-narrow.png" alt="navbar-brand-burger-narrow">
</p>

## <a id="navbar-dropdowns">Dropdowns</a>

### <a id="navbar-dropdown">Navbar dropdown</a>

Navbar dropdown displays a list of items on hover.

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-dropdown/navbar-dropdown-preview.png" alt="navbar-dropdown-preview">
</p>

Dropdown has a number of authorable properties.

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-dropdown/navbar-dropdown-dialog.png" alt="navbar-dropdown-dialog">
</p>

Author can add an <a href="../../icon">_**icon**_</a> to dropdown's label. It will be displayed _in front_ of all the dropdown items.

_**Dropdown with arrow**_ adds an arrow icon _after_ the label.

_**Boxed verion of dropdown**_ is actual for transparent navbars - it changes the style of dropdown.

_**Revert expanding direction**_ make dropdown list appear above the dropdown label.

With _**Elements in the dropdown**_ author can add elements to be displayed in the dropdown,
each element having its own label and link to a Websight page or external resource.

### <a id="navbar-mega-dropdown">Navbar mega dropdown</a>

Mega dropdown allows author to organize menu with up to 5 columns.
Each column can be either of 'text' or 'highlights' type.

On the example below we have:

  - first column with two sections containing two items each
  - _hidden_ second column.
  - third column containing a single section with a single item
  - fourth column containing two highlights
  - _empty_ fifth column

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-mega-dropdown/navbar-mega-dropdown-preview.png" alt="navbar-mega-dropdown-preview">
</p>

General properties are similar to a regular dropdown described above.

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-mega-dropdown/navbar-mega-dropdown-dialog-general.png" alt="navbar-mega-dropdown-dialog-general">
</p>


Text items are organized into sections.

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-mega-dropdown/navbar-mega-dropdown-dialog-text.png" alt="navbar-mega-dropdown-dialog-text">
</p>

Highlights are not grouped into sections.

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-mega-dropdown/navbar-mega-dropdown-dialog-highlights.png" alt="navbar-mega-dropdown-dialog-highlights">
</p>

Hiding a column leaves empty space.

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-mega-dropdown/navbar-mega-dropdown-dialog-hidden.png" alt="navbar-mega-dropdown-dialog-hidden">
</p>

## <a id="navbar-item">Navbar item</a>

Navbar item is the most flexible Navbar component. 
Author may want to use it when just a label with URL is not enough, or in case they want to add some specific element/layout to Navbar.

Navbar item has three modes:

Link - default mode. Is just a link with a label and optionally an icon.

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-item/navbar-item-dialog-link.png" alt="navbar-item-dialog-link">
</p>

Image - author can use asset or external image as a navbar item. 

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-item/navbar-item-dialog-image.png" alt="navbar-item-dialog-image">
</p>

Container - allows author to use common Kyanite components to construct their own unique navbar item.

<p align="center" width="100%">
    <img class="image--with-border" src="./_images/navbar-item/navbar-item-dialog-container.png" alt="navbar-item-dialog-container">
</p>

