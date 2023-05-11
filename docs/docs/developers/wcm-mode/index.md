# WCM mode

## Overview

Web Content Management (WCM) mode configures information related to how content
is requested. In other words, it refers to the mode through which content is to be used.

Available modes are:

- disabled - for end-user requests
- edit - for content editing
- preview - for previews of content editing

To set the WCM mode, add the request parameter `wcmmode`
to the URL that points to any resource under the `/content/*` path.
For example: `/content/test/pages/some-page.html?wcmmode=disabled`.

The default mode is `disabled`.

## Checking WCM mode

It is possible to test the current WCM mode and respond depending on the mode value. You can achieve this using both HTL and the Java API.

### HTL

In Sling Scripting, including HTL, WCM mode flags are available. They can be used to evaluate conditions via, for example, a `data-sly-test`.

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

In the Java API, the WCM mode is represented by the `pl.ds.websight.pages.foundation.WcmMode` enum and delivered 
by `pl.ds.websight:websight-pages-foundation-bundle`.
The enum value is set within the request attribute `WcmMode.REQUEST_ATTRIBUTE_NAME` and is used to resolve
the WCM mode from the request during request processing. The mode can be tested using the `WcmMode` enum methods.

## Forcing WCM mode in HTL

If you include resources or scripts in HTL using `data-sly-resource` or `data-sly-include`, you can set the WCM mode 
to a specific value using the `requestAttributes` option and the `wcmmode` object available in HTL.

Read more about `data-sly-resource` and `data-sly-include` [here](https://sling.apache.org/documentation/bundles/scripting/scripting-htl.html#extensions-of-the-htl-specification-1).

```
<sly data-sly-resource="${'title' @ requestAttributes = wcmmode.disabledModeAttribute}"></sly>
```
```
<sly data-sly-resource="${'title' @ requestAttributes = wcmmode.editModeAttribute}"></sly>
```
```
<sly data-sly-resource="${'title' @ requestAttributes = wcmmode.previewModeAttribute}"></sly>
```
