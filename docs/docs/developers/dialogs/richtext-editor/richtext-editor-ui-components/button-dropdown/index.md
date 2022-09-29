# Button dropdown
**wcm/dialogs/components/richtext/ui/buttondropdown**

![Button Dropdown](buttondrop1.png)

![Button Dropdown](buttondrop2.png)

Description:

Component allows to add buttons group to menu bar. Buttons should be added as a children.

### Configuration:

-   **title** - `string` (required)  
    Group title. It’s displayed as a tooltip.
    
-   **icon** - `string`  
    Icon name from Material Icons. If pesent than dropdown will be presented under button with given icon. Otherwise dropdown will be presented under button looks like button with first active action or like first available button - if none action is active.
    
-   **activable** - `boolean`  
    If true means that button will be presented as active if any action under it is active.
    

### Children:

-   Button - Nodes defining available actions.
    

## Example:

```
1<textalign  
2       jcr:primaryType="nt:unstructured"  
3       sling:resourceType="wcm/dialogs/components/richtext/ui/buttondropdown"  4  title="Text Alignment">  
5        <left  jcr:primaryType="nt:unstructured"  
6       sling:resourceType="wcm/dialogs/components/richtext/ui/button"  
7       title="Left Align"  
8       icon="format_align_left">  
9       <plugin  jcr:primaryType="nt:unstructured"  
10           sling:resourceType="wcm/dialogs/components/richtext/plugin/textalign"  11  alignment="left"/>  
12  </left>  
13  <center  jcr:primaryType="nt:unstructured"  
14          sling:resourceType="wcm/dialogs/components/richtext/ui/button"  
15          title="Center Align"  
16          icon="format_align_center">  
17      <plugin  jcr:primaryType="nt:unstructured"  
18          sling:resourceType="wcm/dialogs/components/richtext/plugin/textalign"  19  alignment="center"/>  
20  </center>  
21  <right  jcr:primaryType="nt:unstructured"  
22          sling:resourceType="wcm/dialogs/components/richtext/ui/button"  
23          title="Right Align"  
24          icon="format_align_right">  
25      <plugin  jcr:primaryType="nt:unstructured"  
26          sling:resourceType="wcm/dialogs/components/richtext/plugin/textalign"  27  alignment="right"/>  
28  </right>  
29  <justify  jcr:primaryType="nt:unstructured"  
30          sling:resourceType="wcm/dialogs/components/richtext/ui/button"  
31          title="Justify Align"  
32          icon="format_align_justify">  
33      <plugin  jcr:primaryType="nt:unstructured"  
34          sling:resourceType="wcm/dialogs/components/richtext/plugin/textalign"  35  alignment="justify"/>  
36  </justify>  
37</textalign>
```