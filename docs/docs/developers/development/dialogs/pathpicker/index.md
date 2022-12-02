# Path Picker

**wcm/dialogs/components/pathpicker**

## Description

Path picker is an input that allows the user pick path of resource from repository or to introduce external links. If the value starts with `/` the path picker will autosuggest possible values.

![PathPicker](pathpicker.png)

## Properties

- **name** -  `string` (required)  
    Form field name

- **label** - `string`  
    Display label value

- **required** - `string`  
    Indicates if field value is mandatory

- **rootPath** - `string`  
    If set, suggestions are filtered to the given root path.

- **forceRootPath** - `string` (if not defined `false`)  
    Indicates whether the input value should be validated to start with the given `rootPath` value.

- **removeIfEmpty** - `string` (if not defined `false`)  
    Indicates if property in JCR will be removed, if contains empty String, or will be kept with that value

- **description** - `string`  
    Display description value as a tooltip

- **placeholder** - `string`  
    Override for the placeholder text that appears when the value is empty.

## Example

```json
"link": {
  "sling:resourceType": "wcm/dialogs/components/pathpicker",
  "rootPath": "/content",
  "name": "link",
  "label": "URL",
  "forceRootPath": true
}
```
