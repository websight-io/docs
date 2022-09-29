# Toggle

**wcm/dialogs/components/toggle**

## Description

Allows user choose enable or disable state.

## Properties

- **name** -  `string` (required)  
    Form field name

- **label** - `string`(required)  
    Display label value

- **checkedByDefault** - `string`  
    Indicates if field should be checked by default. Default: “false”.

- **checkedValue** - `string`  
    Define what value will be saved in JCR if checkbox is checked. Default: “true” String

- **uncheckedValue** - `string`  
Define what value will be saved in JCR if checkbox is NOT checked. Default: “false” String

- **description** - `string`  
Display description value as a tooltip

## Example

```
1<openInNewTab jcr:primaryType="nt:unstructured" 
2   sling:resourceType="wcm/dialogs/components/toggle" 
3   name="openInNewTab" 
4   label="Open link in new tab" 
5   checkedByDefault="true" 
6   checkedValue="yes" 
7   uncheckedValue="no"/>
```
