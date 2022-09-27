# RichText Editor

**wcm/dialogs/components/richtext**

## Description:

Provides many functionalities allows authors to edit text content.  
Component requires [configuration](https://teamds.atlassian.net/wiki/spaces/WEBS/pages/265682964 "/wiki/spaces/WEBS/pages/265682964") which defines what functionalities should be available and how menu bar should looks like.

## Properties:

-   **name** -  `string` (required)  
    Form field name
    
-   **label** - `string` (optional)  
    Display label value
    
-   **required** - `string` (optional, default `false`)  
    Indicates if field value is mandatory
    
-   **removeIfEmpty** - `string` (optional, default `false`)  
    Indicates if the property in JCR will be removed, if contains an empty String, or will be kept with that value
    
-   **description** - `string` (optional)  
    Display description value as tooltip
    
-   **configuration** - `string` (optional, default `/apps/wcm/dialogs/components/richtext/configuration`)  
    absolute path to configuration node; configuration can be also defined inline, see [RichText Editor - configuration](https://teamds.atlassian.net/wiki/spaces/WEBS/pages/265682964)
    

Example:

```
1<richtext  
2  jcr:primaryType="nt:unstructured"  
3  sling:resourceType="wcm/dialogs/components/richtext"  
4  name="text"  5  label="Text"/>
```

![](blob:https://stackedit.io/bb9af8a0-d957-41ef-ac42-0cfad8de4b2f)