# Include

**wcm/dialogs/components/include**

## Description

Allows users to include other components. Typically used to avoid code duplication. When having a component (e.g. select component for heading levels) that is used in multiple places, we can extract it to a common place and include it everywhere instead of duplicating it.

## Properties

- **path** -  `string` (optional if we customize the included component. See customization below)  
    The path of the resource that needs to be included.

- **namespace** - `string` (optional)  
    If we include the same component multiple times, then we will have name conflict. To avoid it, we can set the namespace property. The name properties' values will be prepended by this namespace. For example: if the included component’s name property is `authorName` and we set `book1` as namespace, then the name will be `book1/authorName` while reading and saving the dialog.

```json
"headingLevel": {
  "sling:resourceType": "wcm/dialogs/components/include",
  "path": "/libs/howlite/components/common/headinglevel",
  "namespace": "secondsubtitle"
}
```

## Customization

Sometimes it is not enough to simply include some other components and use the default settings provided by the included component. We can easily customize it by creating a child node named `include`. If we do so, we have to set the `sling:resourceSuperType` property. Its value should be the path of the component that we want to include.

After `sling:resourceSuperType` is set up correctly, we can add properties to the `include` node. Additionally we can create a similar subtree as the included component’s subtree and we can add/override properties on children nodes as well.

**Note:** under the hood, Sling resource merger is doing the trick for us. This means that we can use properties like `sling:hideResource` , `sling:orderBefore` , etc.

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
