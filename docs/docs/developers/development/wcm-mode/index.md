# WCM mode

## Overview

Web Content Management mode is information related to requests about how the requested content
will be used - mode of using the content.

Available modes are:

- disabled - in this mode response for the client request is rendered
- edit - in this mode response for the content editor is rendered
- preview - in this mode response for the content editor preview is rendered

To set the WCM mode, the request parameter `wcmmode` can be added
to URL referencing any resource under the `/content/*` path,
like `/content/test/pages/some-page.html?wcmmode=disabled`.

The default mode is `disabled`.

## Checking WCM mode

It is possible to test the current WCM mode, to respond depending on the mode value.

### HTL

In Sling Scripting, including HTL, WCM mode can be tested by using the object provided at `wcmmode` key.

The object allows testing if the current mode is the given mode.

```
<sly data-sly-test="${wcmmode.disabled}">
    This will be printed only if the current mode is 'disabled'.
</sly>
```
```
<sly data-sly-test="${wcmmode.edit}">
    This will be printed only if the current mode is 'edit'.
</sly>
```
```
<sly data-sly-test="${wcmmode.preview}">
    This will be printed only if the current mode is 'preview'.
</sly>
```

### Java API

In Java API the WCM mode is represented by `pl.ds.websight.pages.foundation.WcmMode` enum delivered 
by `pl.ds.websight:websight-pages-foundation-bundle`.
The enum value is set at request attribute `WcmMode.REQUEST_ATTRIBUTE_NAME` and used to resolve
the WCM mode from the request during request processing. The mode can be tested using the `WcmMode` enum methods.

## Forcing WCM mode in HTL

While including resources in HTL using `data-sly-resource` or `data-sly-include` the WCM mode can be changed 
to specific mode using the `requestAttributes` option and `wcmmode` object available in HTL.

See more about `data-sly-resource` and `data-sly-include` [here](https://sling.apache.org/documentation/bundles/scripting/scripting-htl.html#extensions-of-the-htl-specification-1).

```
<sly data-sly-resource="${'title' @ requestAttributes = wcmmode.disabledModeAttribute}"></sly>
```
```
<sly data-sly-resource="${'title' @ requestAttributes = wcmmode.editModeAttribute}"></sly>
```
```
<sly data-sly-resource="${'title' @ requestAttributes = wcmmode.previewModeAttribute}"></sly>
```