# Include

**wcm/dialogs/components/include**

## Description

The Include component allows users to include other components within a parent component. It is typically used to avoid code duplication. When you have a component (e.g., a Select component for heading levels) that is used in multiple places, you can extract it to a common place and include it in multiple locations rather than duplicating it within each one.

## Properties

- **path** -  `string` (optional if we customize the included component. See customization below)  
    The path of the resource that needs to be included.

- **namespace** - `string` (optional)  
    If we include the same component multiple times, then we will have a name conflict. To avoid this, we can set the namespace property. The name properties' values will be prepended by this namespace. For example: if the included component's name property is `authorName` and we set `book1` as the namespace,  the name will be `book1/authorName` when reading and saving the dialog.

```json
"headingLevel": {
  "sling:resourceType": "wcm/dialogs/components/include",
  "path": "/libs/howlite/components/common/headinglevel",
  "namespace": "secondsubtitle"
}
```

## Customization

Sometimes it is not enough to include other components and use the default settings provided by the included component. We can easily customize it by creating a child node named `include`. If we do so, we have to set the `sling:resourceSuperType` property. Its value should be the path of the component that we want to include.

After `sling:resourceSuperType` is set up correctly, we can add properties to the `include` node. Additionally, we can create a subtree that is similar to the included component's subtree. We can also add or override properties on child nodes.

**Note:** under the hood, the Sling resource merger does this work for us. This means that we can use properties like `sling:hideResource` , `sling:orderBefore` , etc.

#### Included component

```json
{
  "sling:resourceType": "wcm/dialogs/components/radio",
  "name": "headingLevel",
  "description": "HTML heading level help to communicate the organization and hierarchy of the content (for SEO and accessibility)",
  "label": "Heading level",
  "h1": {
    "sling:resourceType": "wcm/dialogs/components/radio/option",
    "label": "H1",
    "value": "h1"
  },
  "h2": {
    "sling:resourceType": "wcm/dialogs/components/radio/option",
    "label": "H2",
    "selected": true,
    "value": "h2"
  },
  "h3": {
    "sling:resourceType": "wcm/dialogs/components/radio/option",
    "label": "H3",
    "value": "h3"
  }
}
```

#### Include component

```json
"includedHeadingLevel": {
  "sling:resourceType": "wcm/dialogs/components/include",
  "include": {
    "sling:resourceSuperType": "/libs/howlite/components/common/headinglevel",
    "label": "Custom label",
    "h1": {
      "sling:hideResource": "true"
    },
    "h2": {
      "selected": false
    },
    "h3": {
      "selected": true
    },
    "h4": {
      "sling:resourceType": "wcm/dialogs/components/radio/option",
      "label": "H4",
      "value": "h4"
    }
  }
}
```

#### Result: (this will be included in the end)

```json
{
  "sling:resourceType": "wcm/dialogs/components/radio",
  "name": "headingLevel",
  "description": "HTML heading level help to communicate the organization and hierarchy of the content (for SEO and accessibility)",
  "label": "Custom label",
  "h2": {
    "sling:resourceType": "wcm/dialogs/components/radio/option",
    "label": "H2",
    "value": "h2"
  },
  "h3": {
    "sling:resourceType": "wcm/dialogs/components/radio/option",
    "label": "H3",
    "selected": true,
    "value": "h3"
  },
  "h4": {
    "sling:resourceType": "wcm/dialogs/components/radio/option",
    "label": "H4",
    "value": "h4"
  }
}
```
