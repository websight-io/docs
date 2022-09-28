# Tab

**wcm/dialogs/components/tab**

## Description

Allows user to add tab content.

## Properties

- **label** - `string`  
    Display tab name

## Example

```
1<tabPanel 
2           jcr:primaryType="nt:unstructured" 
3           sling:resourceType="wcm/dialogs/components/tabs"> 
4       <tabOne 
5           jcr:primaryType="nt:unstructured" 
6           sling:resourceType="wcm/dialogs/components/tab" 
7           label="Tab One"> 
8     <someElement .../> 
9       </tabOne> 
10      <tabTwo 
11           jcr:primaryType="nt:unstructured" 
12          sling:resourceType="wcm/dialogs/components/tab" 
13          label="Tab Two"> 
14       <someElement .../> 
15   </cssTab> 
16</tabPanel>
```
