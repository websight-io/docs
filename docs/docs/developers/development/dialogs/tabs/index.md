# Tabs

**wcm/dialogs/components/tabs**

## Description

The Tabs comonent allows the user to add a tab panel.

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
