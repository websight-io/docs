# TextArea

**wcm/dialogs/components/textarea**

## Description

Allows user to enter any text over multiple lines.

## Properties

- **name** -  `string` (required)  
    Form field name

- **label** - `string` (required)  
    Display label value

- **required** - `string`  
    Indicates if field value is mandatory

- **removeIfEmpty** - `string` (if not defined `false`)  
    Indicates if the property in JCR will be removed, if contains an empty String, or will be kept with that value

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
