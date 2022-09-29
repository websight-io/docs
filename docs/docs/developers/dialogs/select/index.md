# Select

**wcm/dialogs/components/select**

## Description

Allows user choose one of the options.

## Properties

- **name** -  `string` (required)  
    Form field name

- **label** - `string`(required)  
    Display label value

- **required** - `string`  
    Indicates if field value is mandatory

- **description** - `string`  
    Display description value as a tooltip

It should contain child nodes with options:

# SelectItem

**wcm/dialogs/components/selectitem**

## Description

Defines one of the available option.

## Properties

- **label** - `string`(required)  
    Display label

- **value** - `string`(required)  
    Value of choosen option

- **selected** - `string`  
    Indicates if field is selected by default. By default, this option will not be saved in the properties unless the user selects an option manually. So in order to make things work perfectly, we should use the same default value in the backend side as well.

## Example

```json
"icon": {
  "sling:resourceType": "wcm/dialogs/components/select",
  "name": "socialLinkIcon",
  "label": "Social Link icon",
  "linkedin": {
    "sling:resourceType": "wcm/dialogs/components/select/selectitem",
    "label": "LinkedIn",
    "value": "icon-linkedin"
  },
  "facebook": {
    "sling:resourceType": "wcm/dialogs/components/select/selectitem",
    "label": "Facebook",
    "value": "icon-facebook"
  },
  "twitter": {
    "sling:resourceType": "wcm/dialogs/components/select/selectitem",
    "label": "Twitter",
    "value": "icon-twitter"
  },
  "instagram": {
    "sling:resourceType": "wcm/dialogs/components/select/selectitem",
    "label": "Instagram",
    "value": "icon-instagram"
  }
}
```
