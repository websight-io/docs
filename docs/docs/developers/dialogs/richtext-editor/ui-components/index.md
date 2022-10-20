# Rich Text Editor UI Components
UI Component is a resource which will be used to resolve script for rendering configuration node as JSON. UI Components are used as resource types of resources used to buid RTE tool bar.

JSON object rendered by UI Component should follow format:

```json
{
  "type": ...,  
  "configuration":  {...},  
  "children":  [...],  
  "plugin": ... 
}
```

Where:

-   `type` - should point script with UI component definition
    
-   `configuration` - contains propeties required by component to render properly
    
-   `children` - contains list of subcomponents. It is used by components grouping another ones in some structure.
    
-   `plugin` - plugin component configuration.
    

Component gets properties:

-   `configuration` - contains data from JCR config
    
-   `state` - current state gets from plugin `getState` method
    
-   `action` - action run on event executed by component. It’s get from plugin `getAction` method
    
-   `children` - children components.
    

```js
const Component = ({ configuration, state, action, children }) => {
  return (
      <></>
  ) 
}
```