# Tabs
**wcm/dialogs/components/tabs**

## Description:

Allows user to add tab panel.

## Example:
```
1<tabPanel 
2 jcr:primaryType="nt:unstructured" 
3 sling:resourceType="wcm/dialogs/components/tabs"> 
4 <tabOne 
5 jcr:primaryType="nt:unstructured" 
6 sling:resourceType="wcm/dialogs/components/tab" 
7 label="Tab One"> 
8 <someElement .../> 
9 </tabOne> 
10 <tabTwo 
11 jcr:primaryType="nt:unstructured" 
12 sling:resourceType="wcm/dialogs/components/tab" 
13 label="Tab Two"> 
14 <someElement .../> 
15 </cssTab> 
16</tabPanel>
```


## See also:

[Tab](https://teamds.atlassian.net/wiki/spaces/WEBS/pages/171704369 "/wiki/spaces/WEBS/pages/171704369")