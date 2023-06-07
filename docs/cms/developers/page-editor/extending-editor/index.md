# Extending Page Editor

## Overview

Developers may need to extend the functionality of the _Page editor_. You can provide the _Editor extension_ to achieve this. 
The _Editor extension_ is delivered as JavaScript and uses the _Page editor_ API.

!!! Info "Note"
       The _Page editor_ API remains under development. Detailed specifications will be provided in the future.
## Registering extension

To define the _Editor extension_ you must create a JavaScript file, which will be loaded in the _Page editor_ by _Web Fragments_.

_Web Fragments_ allows you to register JavaScript files (JavaScript module) that will be imported using
[dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) in the application runtime.
The _Web Fragments_ scripts should provide [default export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) to
deliver object, function and so on, depending on the given case. _Web Fragments_ defines the key that a given fragment is related to.
The expected type of default export should be checked in the specification of a given extension point.
In numerous parts of the application, _Web Fragments_ with particular keys are imported, making it possible to extend WebSight CMS.

The key of _Web Fragments_ loaded by _Page editor_ to get extensions is `websight.editor.spi.extension`.
The expected default export should provide an object with the `init` function with a single argument, which will be the _Page editor_ object.

To register the fragment, provide the OSGi components that implement the `pl.ds.websight.fragments.registry.WebFragment` interface to
provide information about the fragment key, the location of the JavaScript file and the ranking used to order imports.

There is a required Maven dependency (see the version of the `websight-fragments-registry` bundle used in your system in
[Apache Felix Web Console in your local instance](http://localhost:8080/system/console/bundles):
```xml
<dependency>
  <groupId>pl.ds.websight</groupId>
  <artifactId>websight-fragments-registry</artifactId>
  <version>1.0.3</version>
  <scope>provided</scope>
</dependency>
```

Example component:
```java
package com.myapp.fragments;

import org.osgi.service.component.annotations.Component;
import pl.ds.websight.fragments.registry.WebFragment;

@Component
public class ExamplePageEditorExtensionWebFragment implements WebFragment {

  @Override
  public String getKey() {
    // Web Fragment key - different extension points use different keys.
    // This key is used for Page editor extensions, so the script file specified in the getFragment
    // method will be imported by the Page editor and used as a Page editor extension.
    return "websight.editor.spi.extension";
  }

  @Override
  public String getFragment() {
    // JavaScript module to import. Must provide default export in format expected by the
    // extension point related to the Web Fragment key in use.
    return "/app/myapp/author/editor/extensions/ExampleExtension.js";
  }

  @Override
  public int getRanking() {
    // Web Fragments are imported in order according to the ranking value, starting with the lowest.
    return 100;
  }
}
```

The JavaScript file returned by the `getFragment` method should be a bundle resource provided by your
application and must be available in the CMS authoring runtime (specifically, it must be accessible for content author browser requests).
Example content:
```
export default {
  init: (editor) => {
    // Use editor object here.
  }
}
```

## Using Page editor extensions

Below you can find examples of Page editor extensions usage.

### Editor events

_Page editor_ uses an API for working with events. You can register a handler for events used in _Page editor_.
To register an event listener use `editor.addEventListener` and pass the event type and listener function
(you can use the event data object parameter if needed).

<table>
    <tr>
        <th>Event type</th>
        <th>Description</th>
        <th>Event data</th>
   </tr>
   <tr>
        <td>component-dom-updated</td>
        <td>This event is thrown after component's dom is updated.</td>
        <td>`target` - component</td>
   </tr>
</table>

Example extension registering the event listener:
```
export default {
  init: (editor) => {
    editor.addEventListener('component-dom-updated', () => {
      // React to DOM update, for example reload edited document:
      editor.componentTree.get().parentDocument.location.reload();
    });
  }
}
```
