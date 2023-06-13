# Checkbox

**wcm/dialogs/components/checkbox**

## Description

The Checkbox dialog field allows the user to selection an option from a list of checkboxes.

## Properties

- **name** -  `string` (required)  
    Form field name

- **label** - `string`(required)  
    Display label value

- **checkedValue** - `string`  
    Define what value will be saved in JCR if the checkbox is checked. Default: “true” String

- **uncheckedValue** - `string`  
    Define what value will be saved in JCR if the checkbox is NOT checked. Default: “false” String

- **description** - `string`  
    Display description value as a tooltip

To set the default value see the [Default state](../../dialogs#default-state) section

## Example

```json
"isSlider": {
  "sling:resourceType": "wcm/dialogs/components/checkbox",
  "name": "isSlider",
  "label": "Display as a slider"
}
```
