# Text Field

**wcm/dialogs/components/textfield**

## Description

Allows user to enter any text.

## Properties

- **name** -  `string` (required)  
    Form field name

- **label** - `string`  
    Display label value

- **required** - `string`  
    Indicates if field value is mandatory

- **removeIfEmpty** - `string` (if not defined `false`)  
    Indicates if the property in JCR will be removed, if contains an empty String, or will be kept with that value

- **description** - `string`  
    Display description value as tooltip

## Example

```json
"title": {
  "sling:resourceType": "wcm/dialogs/components/textfield",
  "name": "title",
  "label": "Title"
}
```
