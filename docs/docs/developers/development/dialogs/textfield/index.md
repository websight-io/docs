# Text Field

**wcm/dialogs/components/textfield**

## Description

The Text Field dialog field allows users to enter text.

## Properties

- **name** -  `string` (required)  
    Form field name

- **label** - `string`  
    Display label value

- **required** - `string`  
    Indicates if field value is mandatory

- **removeIfEmpty** - `string` (if not defined `false`)  
    Indicates if property in JCR will be removed if it contains empty String, or will be retained with that value

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
