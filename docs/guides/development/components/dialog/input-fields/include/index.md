# Include

**wcm/dialogs/components/include**

## Description

Allows users to include other components. Typically used to avoid code duplication. When having a component (e.g. select component for heading levels) that is used in multiple places, we can extract it to a common place and include it everywhere instead of duplicating it.

## Properties

- **path** -  `string` (optional if we customize the included component. See customization below)  
    The path of the resource that needs to be included.

- **namespace** - `string` (optional)  
    If we include the same component multiple times, then we will have name conflict. To avoid it, we can set the namespace property. The name properties' values will be prepended by this namespace. For example: if the included component’s name property is `authorName` and we set `book1` as namespace, then the name will be `book1/authorName` while reading and saving the dialog.

```
1<headingLevel 
2   jcr:primaryType="nt:unstructured" 
3   sling:resourceType="wcm/dialogs/components/include" 
4   path="/apps/howlite/components/common/headingLevel" 
5   namespace="secondsubtitle"/>
```

## Customization

Sometimes it is not enough to simply include some other components and use the default settings provided by the included component. We can easily customize it by creating a child node named `include`. If we do so, we have to set the `sling:resourceSuperType` property. Its value should be the path of the component that we want to include.

After `sling:resourceSuperType` is set up correctly, we can add properties to the `include` node. Additionally we can create a similar subtree as the included component’s subtree and we can add/override properties on children nodes as well.

**Note:** under the hood, Sling resource merger is doing the trick for us. This means that we can use properties like `sling:hideResource` , `sling:orderBefore` , etc.

#### Included component

```
1<headingLevel 
2   jcr:primaryType="nt:unstructured" 
3   sling:resourceType="wcm/dialogs/components/select" 
4   label="Heading level" 
5   name="headingLevel"> 
6   <h1 
7       jcr:primaryType="nt:unstructured" 
8       sling:resourceType="wcm/dialogs/components/select/selectitem" 
9       label="Heading1" 
10      value="h1" 
11     /> 
12  <h2 
13      jcr:primaryType="nt:unstructured" 
14      sling:resourceType="wcm/dialogs/components/select/selectitem" 
15      label="Heading2" 
16      value="h2" 
17     /> 
18  <h3 
19      jcr:primaryType="nt:unstructured" 
20      sling:resourceType="wcm/dialogs/components/select/selectitem" 
21      label="Heading3" 
22      value="h3" 
23     /> 
24  </headingLevel>
```

#### Include component

```
1<includedHeadingLevel 
2   jcr:primaryType="nt:unstructured" 
3   sling:resourceType="wcm/dialogs/components/include"> 
4   <include 
5           jcr:primaryType="nt:unstructured" 
6           sling:resourceSuperType="<path to the component above>" 
7           label="Custom label"> 
8       <h1 
9           jcr:primaryType="nt:unstructured" 
10          sling:hideResource="true" 
11      /> 
12      <h2 
13          jcr:primaryType="nt:unstructured" 
14          selected="true" 
15      /> 
16      <h4 
17          jcr:primaryType="nt:unstructured" 
18          value="h4" 
19          label="Heading4" 
20      /> 
21  </include> 
22</includedHeadingLevel>
```

#### Result: (this will be included in the end)

```
1<headingLevel 
2   jcr:primaryType="nt:unstructured" 
3   sling:resourceType="wcm/dialogs/components/select" 
4   name="headingLevel" 
5   label="Custom label"> 
6     <h2 
7       jcr:primaryType="nt:unstructured" 
8       sling:resourceType="wcm/dialogs/components/select/selectitem" 
9       label="Heading2" 
10      value="h2" 
11      selected="true" 
12    /> 
13    <h3 
14      jcr:primaryType="nt:unstructured" 
15      sling:resourceType="wcm/dialogs/components/select/selectitem" 
16      value="h3" 
17      label="Heading3" 
18    /> 
19    <h4 
20      jcr:primaryType="nt:unstructured" 
21      sling:resourceType="wcm/dialogs/components/select/selectitem" 
22      value="h4" 
23      label="Heading4" 
24    /> 
25</headingLevel>
```
