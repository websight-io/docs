# Dropdown

**wcm/dialogs/components/richtext/ui/dropdown**

![Dropdown](dropdown1.png)

![Dropdown](dropdown2.png)

## Description

Component allows to add actions group to menu bar. Each action should be defined as a DropdownItem child.

### Configuration

- **title** -  `string` (required)  
    Group title. It’s displayed as a tooltip.

### Children

- DropdownItem - Nodes defining available actions.

# DropdownItem

**wcm/dialogs/components/richtext/ui/dropdown/dropdownitem**

## Description

Component allows to add action to dropdown.

### Configuration

- **title** -  `string` (required)  
    Action title. It’s displayed in a dropdown.

### State

- **isActive** - `boolean`  
    Defines if item should be checked as active.

### Children

- plugin - node defines edit action caused by an item.

## Example

```
1<textstyle  
2           jcr:primaryType="nt:unstructured"  
3           sling:resourceType="wcm/dialogs/components/richtext/ui/dropdown"  
4           title="Text Style">  
5   <h1  jcr:primaryType="nt:unstructured"  
6        sling:resourceType="wcm/dialogs/components/richtext/ui/dropdown/dropdownitem"  
7           title="Heading 1">  
8           <plugin  jcr:primaryType="nt:unstructured"  
9               sling:resourceType="wcm/dialogs/components/richtext/plugin/heading"  
10              level="1"/>  
11  </h1>  
12  <h2  jcr:primaryType="nt:unstructured"  
13          sling:resourceType="wcm/dialogs/components/richtext/ui/dropdown/dropdownitem"  
14          title="Heading 2">  
15          <plugin  jcr:primaryType="nt:unstructured"  
16              sling:resourceType="wcm/dialogs/components/richtext/plugin/heading"  
17              level="2"/>  
18  </h2>  
19  <h3  jcr:primaryType="nt:unstructured"  
20          sling:resourceType="wcm/dialogs/components/richtext/ui/dropdown/dropdownitem"  
21          title="Heading 3">  
22          <plugin  jcr:primaryType="nt:unstructured"  
23              sling:resourceType="wcm/dialogs/components/richtext/plugin/heading"  
24              level="3"/>  
25  </h3>  
26  <h4  jcr:primaryType="nt:unstructured"  
27          sling:resourceType="wcm/dialogs/components/richtext/ui/dropdown/dropdownitem"  
28          title="Heading 4">  
29          <plugin  jcr:primaryType="nt:unstructured"  
30              sling:resourceType="wcm/dialogs/components/richtext/plugin/heading"  
31              level="4"/>  
32  </h4>  
33  <h5  jcr:primaryType="nt:unstructured"  
34          sling:resourceType="wcm/dialogs/components/richtext/ui/dropdown/dropdownitem"  
35          title="Heading 5">  
36  <plugin  jcr:primaryType="nt:unstructured"  
37          sling:resourceType="wcm/dialogs/components/richtext/plugin/heading"  
38          level="5"/>  
39  </h5>  
40  <h6  jcr:primaryType="nt:unstructured"  
41          sling:resourceType="wcm/dialogs/components/richtext/ui/dropdown/dropdownitem"  
42          title="Heading 6">  
43          <plugin  jcr:primaryType="nt:unstructured"  
44              sling:resourceType="wcm/dialogs/components/richtext/plugin/heading"  
45              level="6"/>  
46  </h6>  
47  <paragraph  jcr:primaryType="nt:unstructured"  
48              sling:resourceType="wcm/dialogs/components/richtext/ui/dropdown/dropdownitem"  
49  title="Paragraph">  
50  <plugin  jcr:primaryType="nt:unstructured"  
51  sling:resourceType="wcm/dialogs/components/richtext/plugin/paragraph"/>  
52  </paragraph>    
53</textstyle>
```
