#AssetReference
**wcm/dialogs/components/assetreference**

## Description:

Asset reference is an input that allows the user to pick an asset from the space by dragging it from the assets tab on the left sidebar. It will only allow dropping assets that match the mime type of the field’s configuration

![](blob:https://stackedit.io/e97608c9-16c0-4cbc-93d6-d476fcde7f37)

## Properties:

-   **name** -  `string` (required)  
    Form field name
    
-   **label** - `string`  
    Display label value
    
-   **required** - `string`  
    Indicates if field value is mandatory
    
-   **mimeTypes** - `string[]`  
    List of allowed MIME Types that can be dropped on the field - it supports simple wildcards like `image/*` or `*`
    
-   **emptyText** - `string` (if not defined, `"Drop asset here"`)  
    Text that will be displayed in the drop area when an asset is not selected
    

## Example:

```
1<imageAsset 
2 jcr:primaryType="nt:unstructured" 
3 sling:resourceType="wcm/dialogs/components/assetreference" 
4 mimeTypes="[image/jpeg,image/gif]" 
5 emptyText="No asset yet, just drop one here" 
6 name="imageAsset" 
7 label="Image Asset" />
```