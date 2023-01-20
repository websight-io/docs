# Container

**wcm/dialogs/components/container**

## Description:

The Container dialog field allows the user to group multiple elements into a container. It is useful for showing or hiding a group of dialog fields.

## Example:

```json
"container": {
  "sling:resourceType": "wcm/dialogs/components/container",
  "firstelement": {
    "sling:resourceType": "wcm/dialogs/components/textfield",
    "name": "firstelement",
    "label": "First element"
  },
  "secondelement": {
    "sling:resourceType": "wcm/dialogs/components/textfield",
    "name": "secondelement",
    "label": "Second element"
  }
}
```
