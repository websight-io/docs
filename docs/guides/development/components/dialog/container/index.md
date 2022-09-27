# Container

**wcm/dialogs/components/container**

## Description:

Component allows to group other elements. May be useful e.g. to [show/hide](https://teamds.atlassian.net/wiki/spaces/WEBS/pages/188645379/Dialog#Show%2Fhide-dialog-components "https://teamds.atlassian.net/wiki/spaces/WEBS/pages/188645379/Dialog#Show%2Fhide-dialog-components") group of components.

## Example:

```
1<conatiner 
2 jcr:primaryType="nt:unstructured" 
3 sling:resourceType="wcm/dialogs/components/container"> 
4 <firstelement 
5 jcr:primaryType="nt:unstructured" 
6 sling:resourceType="wcm/dialogs/components/textfield" 
7 name="firstelement" 
8 label="First element"/> 
9 <secondelement 
10 jcr:primaryType="nt:unstructured" 
11 sling:resourceType="wcm/dialogs/components/textfield" 
12 name="secondelement" 13 label="Second element"/> 14</conatiner>
```