# Tab

**wcm/dialogs/components/tab**

## Description

Allows user to add tab content.

## Properties

- **label** - `string`  
    Display tab name

## Example

```json
"tabs": {
  "sling:resourceType": "wcm/dialogs/components/tabs",
  "tabOne": {
    "sling:resourceType": "wcm/dialogs/components/tab",
    "label": "Tab One",
    "title": {
      "sling:resourceType": "wcm/dialogs/components/textfield",
      "name": "title",
      "label": "Title"
    }
  },
  "tabTwo": {
    "sling:resourceType": "wcm/dialogs/components/tab",
    "label": "Tab Two",
    "image": {
      "sling:resourceType": "wcm/dialogs/components/assetreference",
      "mimeTypes": ["image/*"],
      "name": "image",
      "label": "Image"
    }
  }
}
```
