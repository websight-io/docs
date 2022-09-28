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

`
1<headingLevel jcr:primaryType="nt:unstructured"
2           sling:resourceType="wcm/dialogs/components/radio"
3           name="level"
4           label="Heading Level"
5           required="true">
6   <h1 jcr:primaryType="nt:unstructured"
7       sling:resourceType="wcm/dialogs/components/radio/option"
8       label="Heading 1"
9       value="h1"/>
10  <h2 jcr:primaryType="nt:unstructured"
11      sling:resourceType="wcm/dialogs/components/radio/option"
12      label="Heading 2"
13      value="h2"
14      selected="true"/>
15  <h3 jcr:primaryType="nt:unstructured"
16      sling:resourceType="wcm/dialogs/components/radio/option"
17      label="Heading 3"
18      value="h3"/>
19 </headingLevel>
```
