# HTML

The look of a given component is defined in an HTML file. Its name has to be consistent with the folder name for a given component. 

The file contains regular HTML tags and elements generated based on the component properties stored in the model. You can implement the dynamic part using [HTL Block Statements](https://experienceleague.adobe.com/docs/experience-manager-htl/using/htl/block-statements.html?lang=en). 

The fundamental part of an HTL statement is `<sly>` tag and its `data-sly-use.model` property that defines `model` variable. They enable you to refer to fields (component properties) defined in the corresponding java file. 

You can use variable `${model.title}` to get a value of the title property and inject it directly into HTML. For example, you can add a text inside `<h3>` tag.

``` html
<h3>${model.title}</h3>
```

Some cases may require to override HTML tag as well. You need to use `data-sly-element` statement and a variable containing an expected value.

The HTML file for the _Title_ component is presented below.

``` xml title="ui.apps/src/main/jcr_root/apps/template/components/title/title.html"

<sly data-sly-use.model="pl.ds.template.components.models.TitleComponent">
       <h3 data-sly-element="${model.headingLevel}">${model.title}</h3>
</sly>
```