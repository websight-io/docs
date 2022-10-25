# Radio

**wcm/dialogs/components/radio**

## Description

Allows user to pick exactly one from many available options.

## Properties

- **name** -  `string` (required)  
    Form field name

- **label** - `string`(required)  
    Display label value

- **description** - `string`  
    Display description value as a tooltip

- **required** - `string`  
    Indicates if field value is mandatory

- **removeIfEmpty** - `string` (if not defined `false`)  
    Indicates if property in JCR will be removed, if contains empty String, or will be kept with that value

It should contain child nodes with options. One of this options will be checked by default. If none option will be marked as selected than first one will be chosen. If more than one option will be marked as selected than first ot them will be chosen.

# Option

**wcm/dialogs/components/radio/option**

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
{
  "sling:resourceType": "wcm/dialogs/components/radio",
  "name": "headingLevel",
  "description": "HTML heading level help to communicate the organization and hierarchy of the content (for SEO and accessibility)",
  "label": "Heading level",
  "h1": {
    "sling:resourceType": "wcm/dialogs/components/radio/option",
    "label": "H1",
    "value": "h1"
  },
  "h2": {
    "sling:resourceType": "wcm/dialogs/components/radio/option",
    "label": "H2",
    "selected": true,
    "value": "h2"
  },
  "h3": {
    "sling:resourceType": "wcm/dialogs/components/radio/option",
    "label": "H3",
    "value": "h3"
  }
}
```
