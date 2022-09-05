# Model

The data model is needed only if the component requires a dialog to configure properties. The model is a java file that defines storage for values provided by a user. 

The file should contain the following:

- public class having annotation: `@Model(adaptables = Resource.class)`
- private fields corresponding to component properties defined in a dialog
    - `@Inject` annotation is necessary to inject a dependency into a given field
    - `@Getter` annotation is needed to enable access to the field
    - `@Defalut` annotation is optional and enables to define a default value for a given property 

The recommended location to store models is the following folder:

```
core/src/main/java/pl/ds/howlite/components/models
```

The data model for the _Title_ component is presented below. 

``` java title="core/src/main/java/pl/ds/howlite/components/models/TitleComponent.java"

@Model(adaptables = Resource.class)
public class TitleComponent {
   @Inject
   @Getter
   @Default(values = "Add your title here")
   private String title;

   @Inject
   @Getter
   @Default(values = "h3")
   private String headingLevel;
}
```
