# Extending Page Editor

## Overview

Developers may need to extend functionality of _Page editor_. It can be done by providing _Editor extension_.
_Editor extension_ is delivered as JavaScript and use _Page editor_ API.

!!! Info "Note"
        Detailed specification of _Page editor_ API will be provided together with next versions of WebSight CMS.

## Registering extension

To define the _Editor extension_ you must create JavaScript file which will be loaded in  the_Page editor_ by the _Web Fragments_.

The _Web Fragments_ allows to register JavaScript files which will be imported using
[dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) in the application runtime.
The _Web Fragments_ scripts should provide [default export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
delivering object, function, etc. depending on the given case - _Web Fragments_ key that given fragment is related too.
Expected type of default export should be checked in specification of given extension point.
In number parts of application the _Web Fragments_ with particular keys are imported allowing to extend the WebSight CMS.

The key of _Web Fragments_ loaded by _Page editor_ to get extensions is `websight.editor.spi.extension`.
Expected default export should provide object with `init` function with single argument which will be _Page editor_ object.

To register the fragment provide the OSGi components implementing `pl.ds.websight.fragments.registry.WebFragment` interface
providing information about the fragment key, location of the JavaScript file and ranking used to order imports.

Required Maven dependency (see the version of `websight-fragments-registry` bundle used in your system in
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
    return "websight.editor.spi.extension";
  }

  @Override
  public String getFragment() {
    return "/app/myapp/author/editor/extensions/ExampleExtension.js";
  }

  @Override
  public int getRanking() {
    return 100;
  }
}
```

The JavaScript file returned by `getFragment` method should be bundle resource provided by your
application and must be available in CMS authoring runtime (accessible for content author browser requests).
Example content:
```
export default {
  init: (editor) => {
    // Use editor object here.
  }
}
```

## Using Page editor extensions

Here you can find cases of Page editor extensions usage.

### Editor events

_Page editor_ overs API for working with event - you can register handler for events used in _Page editor_.
To register event listener use `editor.addEventListener` and pass event type and listener function
(you can use event data object parameter if needed).

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