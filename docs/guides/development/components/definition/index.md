# Definition

The component definition is an XML file included inside the root folder for a given component. The file name should be `.content.xml`. For the _Title_ component, the full path is 

```
ui.apps/src/main/jcr_root/apps/howlite/components/title/.content.xml
```

The definition must contain the following information:

- xml version with encoding `<?xml version="1.0" encoding="UTF-8"?>`
- root node `<jcr:root>`
- namespaces
    - `xmlns:jcr="http://www.jcp.org/jcr/1.0"`
    - `xmlns:ws="http://ds.pl/websight"`
- component properties (defined on the root node level)

<table style="width:100%">
  <tr>
    <th>Component property</th>
    <th>Required</th>
    <th>Value</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>jcr:primaryType</td>
    <td>yes</td>
    <td>ws:Component</td>
    <td>fixed value for each component</td>
  </tr>
  <tr>
    <td>jcr:title</td>
    <td>Yes</td>
    <td>component name</td>
    <td>component name visible in the page editor of WebSight CMS</td>
  </tr>
  <tr>
   <td>group</td>
   <td>Yes</td>
   <td>group name</td>
   <td>groups enable to present related components together and show them in a valid context, e.g. a given page type</td>
  </tr>
  <tr>
   <td>isContainer</td>
   <td>No</td>
   <td>true or false (default)</td>
   <td>other components may be included in container; if true then allowedComponents property is required too
   </td>
  </tr>
  <tr>
    <td>allowedComponents</td>
    <td>No*</td>
    <td>[component1,component2,group1]</td>
    <td>*required if isContainer=”true”; table defining other components or groups that can be included in the container; please note that spaces after comma are not allowed</td>
  </tr>
</table>



The definition for the _Title_ component that is included in group _Howlite_.

``` xml title="ui.apps/src/main/jcr_root/apps/howlite/components/title/.content.xml"

<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0"
          xmlns:ws="http://ds.pl/websight"
         jcr:primaryType="ws:Component"
         jcr:title="Title"
         group="Howlite"/>
```

The definition for the _Container_ component that is included in group _Howlite_ and can contain components from groups _Howlite_ and _Other_.

```xml title="ui.apps/src/main/jcr_root/apps/howlite/components/container/.content.xml"

<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0"
          xmlns:ws="http://ds.pl/websight"
         jcr:primaryType="ws:Component"
         jcr:title="Container"
         group="Howlite"
         isContainer="true"
         allowedComponents="[Howlite,Other]"/>

```