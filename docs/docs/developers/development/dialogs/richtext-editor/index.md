# Rich Text Editor

**wcm/dialogs/components/richtext**

## Description

Provides many functionalities allows authors to edit text content.  
Component requires [configuration](./configuration/index.md) which defines what functionalities should be available and how menu bar should looks like.

## Properties

- **name** -  `string` (required)  
    Form field name

- **label** - `string` (optional)  
    Display label value

- **required** - `string` (optional, default `false`)  
    Indicates if field value is mandatory

- **removeIfEmpty** - `string` (optional, default `false`)  
    Indicates if the property in JCR will be removed, if contains an empty String, or will be kept with that value

- **description** - `string` (optional)  
    Display description value as tooltip

- **configuration** - `string` (optional, default `/apps/wcm/dialogs/components/richtext/configuration`)  
    absolute path to configuration node; configuration can be also defined inline, see [RichText Editor - configuration](./configuration/index.md)

Example:

```json
"content": {
  "sling:resourceType": "wcm/dialogs/components/richtext",
  "name": "content",
  "label": "Content"
}
```

![RichText Editor](rte1.png)
