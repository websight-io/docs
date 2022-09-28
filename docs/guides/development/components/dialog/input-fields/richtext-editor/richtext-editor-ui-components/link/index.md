# Link

**wcm/dialogs/components/richtext/ui/link**

![Link](link.png)

## Description

Component dedicated for link plugin. It opens a dialog in witch author can add link and select target type.

It provides `href` and `target` properties to execute method.

It expects also both `href` and `target` properties returning from plugin getState method.

### Configuration

- **title** -  `string` (required)  
    Action title. It will be visible in a tooltip. It also will be shown on button in case of lack of icon property

- **icon** - `string`  
    Icon name. If set then button will be visible with defined icon. Available icons can be found in Material Icons font.

### State

- **isActive** - `boolean`  
    Defines if button should be checked as active.

- **href** - `string`  
    Define link destination address.

- **target** - `string`  
    Specifies where to open the linked document.

### Children

- plugin- node defines edit action caused by a button.

## Example

```
1<link jcr:primaryType="nt:unstructured" 
2       sling:resourceType="wcm/dialogs/components/richtext/ui/link" 
3       title="Link" 
4       icon="link"> 
5   <plugin jcr:primaryType="nt:unstructured" 
6       sling:resourceType="wcm/dialogs/components/richtext/plugin/link"/> 
7</link>
```
