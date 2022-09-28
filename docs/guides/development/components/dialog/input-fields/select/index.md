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

```
1<headingLevel 
2           jcr:primaryType="nt:unstructured" 
3           sling:resourceType="wcm/dialogs/components/select" 
4           name="level" 
5           label="Heading Level" 
6           required="true"> 
7       <h1 
8           jcr:primaryType="nt:unstructured" 
9           sling:resourceType="wcm/dialogs/components/selectitem" 
10          label="Heading 1" 
11          value="h1"/> 
12      <h2 
13          jcr:primaryType="nt:unstructured" 
14          sling:resourceType="wcm/dialogs/components/selectitem" 
15          label="Heading 2" 
16          value="h2"/> 
17      <h3 
18          jcr:primaryType="nt:unstructured" 
19          sling:resourceType="wcm/dialogs/components/selectitem" 
20          label="Heading 3" 
21          value="h3"/> 
22      <h4 
23          jcr:primaryType="nt:unstructured" 
24          sling:resourceType="wcm/dialogs/components/selectitem" 
25          label="Heading 4" 
26          value="h4"/> 
27      <h5 
28          jcr:primaryType="nt:unstructured" 
29          sling:resourceType="wcm/dialogs/components/selectitem" 
30          label="Heading 5" 
31          value="h5"/> 
32      <h6 
33          jcr:primaryType="nt:unstructured" 
34          sling:resourceType="wcm/dialogs/components/selectitem" 
35          label="Heading 6" 
36          value="h6"/> 
37      <p 
38          jcr:primaryType="nt:unstructured" 
39          sling:resourceType="wcm/dialogs/components/selectitem" 
40          label="Paragraph" 
41          value="p"/> 42</headingLevel>`
```
