# Rich Text Editor Plugin Components
Plugin Component is a resource which allow to register feature allows to edit text content.

Plugin component should provide configuration in JSON format:

```json
{  
  "type": ...,  
  "configuration":  {...}  
}
```

Where `type` should point script with plugin definition and `configuration` contains all aditional properties used by plugin.

RichText editor is based on [TipTap](https://tiptap.dev/ "https://tiptap.dev/") and plugins are responsible for interaction with TipTap Editor.

Plugin defintinon should provide methods:

```js
const  Plugin  =  (configuration)  =>  {  
 
  return  {  
    getTipTapExtensions:  ()  =>  {  
      return  [...]  
    },    
    getAction:  (context)  =>  {  
      return  {
        execute:  (state)  =>  {}
      }  
    },  
    getState:  (context)  =>  {  
      return  {...}  
    }  
  }  
}  

export  default  Plugin;
```

Where:

- `getTipTapExtensions` - should return TipTap extensions required by plugin.

- `getAction` - should return object with execute method. This method will be executed by UI Component. It can get current state as a paramater.

- `getState` - should return an object with properties required to build proper state of UI Component. Object with this same structure is expected in `execute` method.

- `configuration` - contains data from JCR config

- `context` - Contains key `editor` referencing Tip Tap editor.

- `state` - Object with same structure as returned by `getState`

# Available plugins

| Plugin                                                                              | Interfaces                                                                                                                            | Example Usage                                                                                                                                                                                                                                                |
|-------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Bold</br>**wcm/dialogs/components</br>/richtext/plugin/bold**                       | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` { isActive: ... } ```                                       | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/bold"}```                                                                                                                                                                        |
| Italic</br>**wcm/dialogs/components</br>/richtext/plugin/italic**                   | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` { isActive: ... } ```                                       | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/italic"}```                                                                                                                                                                      |
| Underline</br>**wcm/dialogs/components</br>/richtext/plugin/underline**             | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` { isActive: ... } ```                                       | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/underline"}```                                                                                                                                                                   |
| Strikethrough</br>**wcm/dialogs/components</br>/richtext/plugin/strikethrough**     | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` { isActive: ... } ```                                       | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/strikethrough"}```                                                                                                                                                               |
| BulletList</br>**wcm/dialogs/components</br>/richtext/plugin/bulletlist**           | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` { isActive: ... } ```                                       | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/bulletlist"}```                                                                                                                                                                  |
| OrderedList</br>**wcm/dialogs/components</br>/richtext/plugin/orderedlist**         | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` { isActive: ... } ```                                       | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/orderedlist"}```                                                                                                                                                                 |
| Paragraph</br>**wcm/dialogs/components</br>/richtext/plugin/paragraph**             | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` { isActive: ... } ```                                       | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/paragraph"}```                                                                                                                                                                   |
| Heading</br>**wcm/dialogs/components</br>/richtext/plugin/heading**                 | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` { isActive: ... } ```                                       | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/heading", "level": "3"}```</br> level </br> &emsp;&emsp;- `number` (default: 1) </br> &emsp;&emsp; - Heading level (1-6)                                                         |
| Link</br>**wcm/dialogs/components</br>/richtext/plugin/link**                       | getAction: </br> ```{ execute({ href, target }) => {...} }``` </br> getState: </br> ``` { isActive: ..., href: ..., target: ... } ``` | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/link"}```                                                                                                                                                                        |
| UnsetLink</br>**wcm/dialogs/components</br>/richtext/plugin/unsetlink**             | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` { isDisabled: ... } ```                                     | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/unsetlink"}```                                                                                                                                                                   |
| ClearFormatting</br>**wcm/dialogs/components</br>/richtext/plugin/clearformatting** | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` {} ```                                                      | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/clearformatting"}```                                                                                                                                                             |
| HardBreak</br>**wcm/dialogs/components</br>/richtext/plugin/hardbreak**             | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` {} ```                                                      | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/hardbreak"}```                                                                                                                                                                   |
| TextAlign</br>**wcm/dialogs/components</br>/richtext/plugin/textalign**             | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` { isActive: ... } ```                                       | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/textalignment", "alignment": "right"}```</br> alignment </br> &emsp;&emsp;- `string` (default: 'left') </br> &emsp;&emsp;- Text alignment ('left', ‘center', ‘right', 'justify') |
| Undo</br>**wcm/dialogs/components</br>/richtext/plugin/undo**                       | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` { isDisabled: ... } ```                                     | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/undo"}```                                                                                                                                                                        |
| Redo</br>**wcm/dialogs/components</br>/richtext/plugin/redo**                       | getAction: </br> ```{ execute({}) => {...} }``` </br> getState: </br> ``` { isDisabled: ... } ```                                     | ```"plugin": {"sling:resourceType": "wcm/dialogs/components/richtext/plugin/redo"}```                                                                                                                                                                        |
