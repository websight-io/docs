# Text Area

**wcm/dialogs/components/textarea**

## Description

The Text Area component allows the user to enter text over multiple lines.

## Properties

- **name** -  `string` (required)  
    Form field name

- **label** - `string` (required)  
    Display label value

- **required** - `string`  
    Indicates if field value is mandatory

- **removeIfEmpty** - `string` (if not defined `false`)  
    Indicates if property in JCR will be removed if it contains empty String, or will be retained with that value

- **description** - `string`  
    Display description value as a tooltip

## Example

```json
"content": {
  "sling:resourceType": "wcm/dialogs/components/textarea",
  "name": "content",
  "label": "Content"
}
```
