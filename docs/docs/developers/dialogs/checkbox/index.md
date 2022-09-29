# Checkbox

**wcm/dialogs/components/checkbox**

## Description

Allows user choose check some option.

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
1<openInNewTab 
2 jcr:primaryType="nt:unstructured" 
3 sling:resourceType="wcm/dialogs/components/textfield" 
4 name="openInNewTab" 
5 label="Open link in new tab" 
6 checkedByDefault="true" 
7 checkedValue="yes" 
8 uncheckedValue="no"/>
```
