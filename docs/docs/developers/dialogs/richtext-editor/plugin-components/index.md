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

| Plugin                                                                              | <div style="min-width: 150px">Interfaces</div>                                                                                                                                                                 | Example Usage                                                                                                                                                                                                                                                                                                   |
|-------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Bold</br>**wcm/dialogs/components</br>/richtext/plugin/bold**                       | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{ isActive: ... }**                                                                                                                      | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/bold"</br>}**                                                                                                                                                                                          |
| Italic</br>**wcm/dialogs/components</br>/richtext/plugin/italic**                   | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{ isActive: ... }**                                                                                                                      | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/italic"</br>}**                                                                                                                                                                                        |
| Underline</br>**wcm/dialogs/components</br>/richtext/plugin/underline**             | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{ isActive: ... }**                                                                                                                      | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/underline"</br>}**                                                                                                                                                                                     |
| Strikethrough</br>**wcm/dialogs/components</br>/richtext/plugin/strikethrough**     | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{ isActive: ... }**                                                                                                                      | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/strikethrough"</br>}**                                                                                                                                                                                 |
| BulletList</br>**wcm/dialogs/components</br>/richtext/plugin/bulletlist**           | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{ isActive: ... }**                                                                                                                      | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/bulletlist"</br>}**                                                                                                                                                                                    |
| OrderedList</br>**wcm/dialogs/components</br>/richtext/plugin/orderedlist**         | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{ isActive: ... }**                                                                                                                      | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/orderedlist"</br>}**                                                                                                                                                                                   |
| Paragraph</br>**wcm/dialogs/components</br>/richtext/plugin/paragraph**             | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{ isActive: ... }**                                                                                                                      | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/paragraph"</br>}**`                                                                                                                                                                                    |
| Heading</br>**wcm/dialogs/components</br>/richtext/plugin/heading**                 | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{ isActive: ... }**                                                                                                                      | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/heading", </br>&emsp;&emsp;"level": "3""</br>}**</br> level </br> &emsp;&emsp;- `number` (default: 1) </br> &emsp;&emsp; - Heading level (1-6)                                                         |
| Link</br>**wcm/dialogs/components</br>/richtext/plugin/link**                       | getAction: </br> **{ </br>&emsp;execute({ </br>&emsp;&emsp;href, target </br>&emsp;}) => {...}</br>}** </br> getState: </br> **{</br>&emsp;isActive: ..., </br>&emsp;href: ..., </br>&emsp;target: ...</br>}** | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/link""</br>}**                                                                                                                                                                                         |
| UnsetLink</br>**wcm/dialogs/components</br>/richtext/plugin/unsetlink**             | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{ isDisabled: ... }**                                                                                                                    | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/unsetlink""</br>}**                                                                                                                                                                                    |
| ClearFormatting</br>**wcm/dialogs/components</br>/richtext/plugin/clearformatting** | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{}**                                                                                                                                     | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/clearformatting""</br>}**                                                                                                                                                                              |
| HardBreak</br>**wcm/dialogs/components</br>/richtext/plugin/hardbreak**             | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{}**                                                                                                                                     | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/hardbreak""</br>}**                                                                                                                                                                                    |
| TextAlign</br>**wcm/dialogs/components</br>/richtext/plugin/textalign**             | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{ isActive: ... }**                                                                                                                      | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/textalignment", </br>&emsp;&emsp;"alignment": "right""</br>}**</br> alignment </br> &emsp;&emsp;- `string` (default: 'left') </br> &emsp;&emsp;- Text alignment ('left', ‘center', ‘right', 'justify') |
| Undo</br>**wcm/dialogs/components</br>/richtext/plugin/undo**                       | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{ isDisabled: ... }**                                                                                                                    | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/undo"</br>}**                                                                                                                                                                                          |
| Redo</br>**wcm/dialogs/components</br>/richtext/plugin/redo**                       | getAction: </br> **{ execute({}) => {...} }** </br> getState: </br> **{ isDisabled: ... }**                                                                                                                    | **"plugin": \{</br>&emsp;&emsp;"sling:resourceType": &emsp;&emsp;"wcm/dialogs/components/richtext/plugin/redo"</br>}**                                                                                                                                                                                          |
