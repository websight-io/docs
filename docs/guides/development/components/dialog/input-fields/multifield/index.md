# MultiField

**wcm/dialogs/components/textfield**

## Description

Multifield component allows to add/reorder/remove multiple instances of a field.

In the simplest case, this is a simple form input field (e.g. TextField, TextArea) but it can also be a complex component acting as an aggregate of multiple subcomponents (e.g. address entry).

Field used in multifield behaves the same as in plain dialog - e.g. hiding labels.

## Properties

- **name** - `string` (required)  
    Form field name

- **label** - `string`  
    Display label value

- **required**  
    Indicates if field value is mandatory

## Example

Multifield with TextField:

```
1 <multifield  
2       jcr:primaryType="nt:unstructured"  
3       name="users"  
4       label="users"  
5       sling:resourceType="wcm/dialogs/components/multifield">  
6    <textfield  
7           jcr:primaryType="nt:unstructured"  
8           sling:resourceType="wcm/dialogs/components/textfield"  
9           name="name"  
10          label="name">  
11   </textfield>  
12</multifield>`
```

![MultiField](multifield.png)

Multifield with nested Multiefield

```
1<multifield  
2           jcr:primaryType="nt:unstructured"  
3           name="users"  
4           label="Users"  
5           sling:resourceType="wcm/dialogs/components/multifield">  
6       <textfield  
7               jcr:primaryType="nt:unstructured"  
8               sling:resourceType="wcm/dialogs/components/textfield"  
9               name="name"  
10              label="Name">  
11      </textfield>  
12      <multifield  
13          jcr:primaryType="nt:unstructured"  
14          name="addresses"  
15          label="Addresses"  
16          sling:resourceType="wcm/dialogs/components/multifield">  
17      <textfield  
18              jcr:primaryType="nt:unstructured"  
19              sling:resourceType="wcm/dialogs/components/textfield"  
20              name="street"  
21              label="Street">  
22      </textfield>  
23  </multifield> 
24</multifield>
```
