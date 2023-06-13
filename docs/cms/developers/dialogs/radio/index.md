# Radio

**wcm/dialogs/components/radio**

## Description

The Radio component allows users to select exactly one from multiple available options.

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
    Indicates if property in JCR will be removed if it contains empty String, or will be retained with that value

To preselect value see the [Default state](../../dialogs#default-state) section

It should contain child nodes with options. One of these options will be checked by default. If no option is selected to be checked by default, the first one will be automatically chosen. If more than one option is selected to be checked by default, only the first will be chosen.

# Option

**wcm/dialogs/components/radio/option**

## Description

Defines one of the available options.

## Properties

- **label** - `string`(required)  
    Display label

- **value** - `string`(required)  
    Value of choosen option

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
