# Text field
**wcm/dialogs/components/textfield**

## Description:

Allows user to enter any text.

## Properties:

-   **name** -  `string` (required)  
    Form field name
    
-   **label** - `string`  
    Display label value
    
-   **required** - `string`  
    Indicates if field value is mandatory
    
-   **removeIfEmpty** - `string` (if not defined `false`)  
    Indicates if the property in JCR will be removed, if contains an empty String, or will be kept with that value
    
-   **description** - `string`  
    Display description value as tooltip
    

## Example:
```
1<pageTitle 
2 jcr:primaryType="nt:unstructured" 
3 sling:resourceType="wcm/dialogs/components/textfield" 
4 name="jcr:title" 
5 label="Page Title" 
6 required="true"/>`
```
