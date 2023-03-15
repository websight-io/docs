# WCM mode

## Overview

Web Content Management mode (WCM mode) is information related to requests about how the content
is requested - mode of using the content.

Available modes are:

- disabled - for the end users requests
- edit - for the content editing
- preview - for the preview of content editing

To set the WCM mode, add the request parameter `wcmmode`
to URL pointing to any resource under the `/content/*` path,
like `/content/test/pages/some-page.html?wcmmode=disabled`.

The default mode is `disabled`.

## Checking WCM mode

It is possible to test the current WCM mode, to respond depending on the mode value.

### HTL

In Sling Scripting, including HTL, WCM mode flags are available - can be used to evaluate conditions, i.e. in `data-sly-test`.

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

While including resources or scripts in HTL using `data-sly-resource` or `data-sly-include` the WCM mode can be set 
to specific value using the `requestAttributes` option and `wcmmode` object available in HTL.

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
