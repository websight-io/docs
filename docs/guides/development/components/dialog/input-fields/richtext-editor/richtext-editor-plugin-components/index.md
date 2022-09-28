# RichText Editor Plugin Components
Plugin Component is a resource which allow to register feature allows to edit text content.

Plugin component should provide configuration in JSON format:

```
1{  
2  "type": ...,  
3  "configuration":  {...}  
4}
```

Where `type` should point script with plugin definition and `configuration` contains all aditional properties used by plugin.

RichText editor is based on [TipTap](https://tiptap.dev/ "https://tiptap.dev/") and plugins are responsible for interaction with TipTap Editor.

Plugin defintinon should provide methods:

```
1const  Plugin  =  (configuration)  =>  {  
2 
3  return  {  
4  getTipTapExtensions:  ()  =>  {  
5  return  [...]  
6  },  7  getAction:  (context)  =>  {  
8  return  {  
9  execute:  (state)  =>  {}  
10  }  
11  },  
12  getState:  (context)  =>  {  
13  return  {...}  
14  }  
15  }  
16}  
17 
18export  default  Plugin;
```

Where:

- `getTipTapExtensions` - should return TipTap extensions required by plugin.

- `getAction` - should return object with execute method. This method will be executed by UI Component. It can get current state as a paramater.

- `getState` - should return an object with properties required to build proper state of UI Component. Object with this same structure is expected in `execute` method.

- `configuration` - contains data from JCR config

- `context` - Contains key `editor` referencing Tip Tap editor.

- `state` - Object with same structure as returned by `getState`

# Available plugins

   <table>
  <tr>
   <td><strong>Name</strong>
   </td>
   <td><strong>Path</strong>
   </td>
   <td><strong>Configuration</strong>
   </td>
   <td><strong>Interfaces</strong>
   </td>
   <td><strong>Example Usage</strong>
   </td>
  </tr>
  <tr>
   <td>Bold
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/bold</strong>
   </td>
   <td><code>{}</code>
   </td>
   <td>
<ul>

<li><br>getAction:<br><br>

<li><code>1{ </code>

<li><code>2  execute ({}) => {...}</code>

<li><code>3}</code>

<li>

<li>getState:<br><br>

<li><code>1{ </code>

<li><code>2  isActive: ... // define if current part of text content has active plugin action.</code>

<li><code>3}</code>

<li>
</li>
</ul>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/bold"/></code>
   </td>
  </tr>
  <tr>
   <td>Italic
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/italic</strong>
   </td>
   <td>{}
   </td>
   <td><br>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({}) => {...}</code>
<p>
<code>3}</code>
<p>
getState:<br><br><code>1{ </code>
<p>
<code>2  isActive: ... // define if current part of text content has active plugin action.</code>
<p>
<code>3}</code>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/italic"/></code>
   </td>
  </tr>
  <tr>
   <td>Underline
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/underline</strong>
   </td>
   <td>{}
   </td>
   <td>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({}) => {...}</code>
<p>
<code>3}</code>
<p>
getState:<br><br><code>1{ </code>
<p>
<code>2  isActive: ... // define if current part of text content has active plugin action.</code>
<p>
<code>3}</code>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/underline"/></code>
   </td>
  </tr>
  <tr>
   <td>Strikethrough
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/strikethrough</strong>
   </td>
   <td>{}
   </td>
   <td>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({}) => {...}</code>
<p>
<code>3}</code>
<p>
getState:<br><br><code>1{ </code>
<p>
<code>2  isActive: ... // define if current part of text content has active plugin action.</code>
<p>
<code>3}</code>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/strikethrough"/></code>
   </td>
  </tr>
  <tr>
   <td>BulletList
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/bulletlist</strong>
   </td>
   <td>{}
   </td>
   <td>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({}) => {...}</code>
<p>
<code>3}</code>
<p>
getState:<br><br><code>1{ </code>
<p>
<code>2  isActive: ... // define if current part of text content has active plugin action.</code>
<p>
<code>3}</code>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/bulletlist"/></code>
<p>

   </td>
  </tr>
  <tr>
   <td>OrderedList
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/orderedlist</strong>
   </td>
   <td>{}
   </td>
   <td>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({}) => {...}</code>
<p>
<code>3}</code>
<p>
getState:<br><br><code>1{ </code>
<p>
<code>2  isActive: ... // define if current part of text content has active plugin action.</code>
<p>
<code>3}</code>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/orderedlist"/></code>
<p>

   </td>
  </tr>
  <tr>
   <td>Paragraph
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/paragraph</strong>
   </td>
   <td>{}
   </td>
   <td>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({}) => {...}</code>
<p>
<code>3}</code>
<p>
getState:<br><br><code>1{ </code>
<p>
<code>2  isActive: ... // define if current part of text content has active plugin action.</code>
<p>
<code>3}</code>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/paragraph"/></code>
   </td>
  </tr>
  <tr>
   <td>Heading
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/heading</strong>
   </td>
   <td><code>{ level }</code>
<p>
level - <code>number (default: 1)</code> - Heading level (1-6)
   </td>
   <td><br>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({}) => {...}</code>
<p>
<code>3}</code>
<p>
getState:
<p>
<code>1{ </code>
<p>
<code>2  isActive: ... // define if current part of text content is heading.</code>
<p>
<code>3}</code>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/heading"</code>
<p>
<code>3        level="3"/></code>
   </td>
  </tr>
  <tr>
   <td>Link
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/link</strong>
   </td>
   <td><code>{}</code>
   </td>
   <td>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({ href, target }) => {...}</code>
<p>
<code>3}</code>
<p>
getState:
<p>
<code>1{ </code>
<p>
<code>2  isActive: ..., // define if current part of text content has link setted.</code>
<p>
<code>3  href: ..., // define link destination address</code>
<p>
<code>4  target: ... // specifies where to open the linked document. </code>
<p>
<code>5}</code>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/link"/></code>
   </td>
  </tr>
  <tr>
   <td>UnsetLink
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/unsetlink</strong>
   </td>
   <td><code>{}</code>
   </td>
   <td>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({}) => {...}</code>
<p>
<code>3}</code>
<p>
getState:
<p>
<code>1{ </code>
<p>
<code>2  isDisabled: ..., // define if current part of content has link setted and it can be removed.</code>
<p>
<code>3}</code>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/unsetlink"/></code>
<p>

   </td>
  </tr>
  <tr>
   <td>ClearFormatting
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/clearformatting</strong>
   </td>
   <td><code>{}</code>
   </td>
   <td><br>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({}) => {...}</code>
<p>
<code>3}</code>
<p>
getState:
<p>
<code>1{}</code>
<p>

   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/clearformatting"/></code>
<p>

<p>

   </td>
  </tr>
  <tr>
   <td>HardBreak
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/hardbreak</strong>
   </td>
   <td>{}
   </td>
   <td>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({}) => {...}</code>
<p>
<code>3}</code>
<p>
getState:
<p>
<code>1{}</code>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/hardbreak"/></code>
   </td>
  </tr>
  <tr>
   <td>TextAlign
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/textalign</strong>
   </td>
   <td><code>{ alignment }</code>
<p>
level - <code>string (default: 'left')</code> - Text alignment ('left', ‘center', ‘right',  'justify')
<p>

   </td>
   <td><br>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({}) => {...}</code>
<p>
<code>3}</code>
<p>
getState:
<p>
<code>1{ </code>
<p>
<code>2  isActive: ..., // define if current content has proper alignment.</code>
<p>
<code>3}</code>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/textalignment"</code>
<p>
<code>3        alignment="right"/></code>
<p>

   </td>
  </tr>
  <tr>
   <td>Undo
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/undo</strong>
   </td>
   <td><code>{}</code>
   </td>
   <td><br>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({}) => {...}</code>
<p>
<code>3}</code>
<p>
getState:
<p>
<code>1{ </code>
<p>
<code>2  isDisabled: ..., // define if action can be run.</code>
<p>
<code>3}</code>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/undo"/></code>
<p>

   </td>
  </tr>
  <tr>
   <td>Redo
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/redo</strong>
   </td>
   <td>{}
   </td>
   <td>getAction:
<p>
<code>1{ </code>
<p>
<code>2  execute ({}) => {...}</code>
<p>
<code>3}</code>
<p>
getState:
<p>
<code>1{ </code>
<p>
<code>2  isDisabled: ..., // define if action can be run.</code>
<p>
<code>3}</code>
   </td>
   <td><code>1&lt;plugin jcr:primaryType="nt:unstructured"</code>
<p>
<code>2        sling:resourceType="wcm/dialogs/components/richtext/plugin/redo"/></code>
<p>

   </td>
  </tr>
</table>
