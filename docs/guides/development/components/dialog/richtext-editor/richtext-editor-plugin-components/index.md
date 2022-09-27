#RichText Editor Plugin Components
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

-   `getTipTapExtensions` - should return TipTap extensions required by plugin.
    
-   `getAction` - should return object with execute method. This method will be executed by UI Component. It can get current state as a paramater.
    
-   `getState` - should return an object with properties required to build proper state of UI Component. Object with this same structure is expected in `execute` method.
    
-   `configuration` - contains data from JCR config
    
-   `context` - Contains key `editor` referencing Tip Tap editor.
    
-   `state` - Object with same structure as returned by `getState`
    

# Available plugins:

   <td>Link
</p>
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/link</strong>
</p>
   </td>
   <td>



<pre class="prettyprint">{}
</pre>


   </td>
   <td>
<ul>

<li><br>getAction:

<li><code>1{ </code>

<li><code>2  execute ({ href, target }) => {...}</code>

<li><code>3}</code>

<li>

<li>getState:

<li><code>1{ </code>

<li><code>2  isActive: ..., // define if current part of text content has link setted.</code>

<li><code>3  href: ..., // define link destination address</code>

<li><code>4  target: ... // specifies where to open the linked document. </code>

<li><code>5}</code>

<li>
 
</p>
</li>
</ul>
   </td>
   <td>



<pre class="prettyprint">1&lt;plugin jcr:primaryType="nt:unstructured"
2        sling:resourceType="wcm/dialogs/components/richtext/plugin/link"/>
</pre>


   </td>
   <td>UnsetLink
</p>
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/unsetlink</strong>
</p>
   </td>
   <td>



<pre class="prettyprint">{}
</pre>


   </td>
   <td>
<ul>

<li><br>getAction:

<li><code>1{ </code>

<li><code>2  execute ({}) => {...}</code>

<li><code>3}</code>

<li>

<li>getState:

<li><code>1{ </code>

<li><code>2  isDisabled: ..., // define if current part of content has link setted and it can be removed.</code>

<li><code>3}</code>

<li>
 
</p>
</li>
</ul>
   </td>
   <td>



<pre class="prettyprint">1&lt;plugin jcr:primaryType="nt:unstructured"
2        sling:resourceType="wcm/dialogs/components/richtext/plugin/unsetlink"/>
</pre>


<p>
 
</p>
   </td>
   <td>ClearFormatting
</p>
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/clearformatting</strong>
</p>
   </td>
   <td rowspan="2" >



<pre class="prettyprint">{}
</pre>


   </td>
   <td rowspan="2" >
<ul>

<li><br>getAction:

<li><code>1{ </code>

<li><code>2  execute ({}) => {...}</code>

<li><code>3}</code>

<li>

<li>getState:

<li><code>1{}</code>
 
</p>
</li>
</ul>
   </td>
   <td>



<pre class="prettyprint">1&lt;plugin jcr:primaryType="nt:unstructured"
2        sling:resourceType="wcm/dialogs/components/richtext/plugin/clearformatting"/>
</pre>


<p>
 
</p>
<p>
 
</p>
   </td>
   <td>HardBreak
</p>
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/hardbreak</strong>
</p>
   </td>
   <td>



<pre class="prettyprint">1&lt;plugin jcr:primaryType="nt:unstructured"
2        sling:resourceType="wcm/dialogs/components/richtext/plugin/hardbreak"/>
</pre>


   </td>
   <td>TextAlign
</p>
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/textalign</strong>
</p>
   </td>
   <td>



<pre class="prettyprint">{ alignment }
</pre>


<ul>

<li>level - <code>string (default: 'left')</code> - Text alignment ('left', ‘center', ‘right',  'justify')

<p>
 
</p>
</li>
</ul>
   </td>
   <td>
<ul>

<li><br>getAction:

<li><code>1{ </code>

<li><code>2  execute ({}) => {...}</code>

<li><code>3}</code>

<li>

<li>getState:

<li><code>1{ </code>

<li><code>2  isActive: ..., // define if current content has proper alignment.</code>

<li><code>3}</code>

<li>
 
</p>
</li>
</ul>
   </td>
   <td>



<pre class="prettyprint">1&lt;plugin jcr:primaryType="nt:unstructured"
2        sling:resourceType="wcm/dialogs/components/richtext/plugin/textalignment"
3        alignment="right"/>
</pre>


<p>
 
</p>
   </td>
   <td>Undo
</p>
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/undo</strong>
</p>
   </td>
   <td rowspan="2" >



<pre class="prettyprint">{}
</pre>


   </td>
   <td rowspan="2" >
<ul>

<li><br>getAction:

<li><code>1{ </code>

<li><code>2  execute ({}) => {...}</code>

<li><code>3}</code>

<li>

<li>getState:

<li><code>1{ </code>

<li><code>2  isDisabled: ..., // define if action can be run.</code>

<li><code>3}</code>

<li>
</li>
</ul>
   </td>
   <td>



<pre class="prettyprint">1&lt;plugin jcr:primaryType="nt:unstructured"
2        sling:resourceType="wcm/dialogs/components/richtext/plugin/undo"/>
</pre>


<p>
 
</p>
   </td>
   <td>Redo
</p>
   </td>
   <td><strong>wcm/dialogs/components/richtext/plugin/redo</strong>
</p>
   </td>
   <td>



<pre class="prettyprint">1&lt;plugin jcr:primaryType="nt:unstructured"
2        sling:resourceType="wcm/dialogs/components/richtext/plugin/redo"/>
</pre>


<p>
 
</p>
   </td>