# Toggle

**wcm/dialogs/components/toggle**

## Description

The Toggle dialog field allows the user to enable or disable a state.

## Properties

- **name** -  `string` (required)  
    Form field name

- **label** - `string`(required)  
    Display label value

- **checkedByDefault** - `string`  
    Indicates if field should be checked by default. Default: “false”.

- **checkedValue** - `string`  
    Define what value will be saved in JCR if the checkbox is checked. Default: “true” String

- **uncheckedValue** - `string`  
Define what value will be saved in JCR if the checkbox is _not_ checked. Default: “false” String

- **description** - `string`  
Display description value as a tooltip

## Example

```json
"openInNewTab": {
  "sling:resourceType": "wcm/dialogs/components/toggle",
  "name": "openInNewTab",
  "label": "Open in new tab"
}
```
