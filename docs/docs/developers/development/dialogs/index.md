# Dialogs

Dialogs framework which is part of WebSight CMS allows to define dialog fields components used to build the dialog used to submit data saved in content resources.

WebSight CMS delivers set of ready to use components, see subsections of this documentation for details.

## Dialog structure
Each dialog can be build out of two element types:

- containers - used to achieve proper structure of fields in dialog, examples: container, tab, tabs
- fields - used to input values via dialog, examples: textfield, numberfield, pathPicker

Example dialog structure definition can look like this:
```json
{
  "sling:resourceType": "wcm/dialogs/dialog",
  "tabs": {
    "sling:resourceType": "wcm/dialogs/components/tabs",
    "properties": {
      "sling:resourceType": "wcm/dialogs/components/tab",
      "label": "Properties",
      "title": {
        "sling:resourceType": "wcm/dialogs/components/textfield",
        "label": "Title",
        "name": "title"
      },
      "description": {
        "sling:resourceType": "wcm/dialogs/components/richtext",
        "label": "Description",
        "name": "description"
      }
    },
    "advanced": {
      "sling:resourceType": "wcm/dialogs/components/tab",
      "label": "Advanced",
      "shadows": {
        "sling:resourceType": "wcm/dialogs/components/toggle",
        "name": "shadows",
        "label": "Use shadows"
      },
      "style": {
        "sling:resourceType": "wcm/dialogs/components/select",
        "label": "Style",
        "name": "style",
        "primary": {
          "sling:resourceType": "wcm/dialogs/components/select/selectitem",
          "label": "Primary",
          "value": "primary"
        },
        "secondary": {
          "sling:resourceType": "wcm/dialogs/components/select/selectitem",
          "label": "Secondary",
          "selected": true,
          "value": "secondary"
        },
        "link": {
          "sling:resourceType": "wcm/dialogs/components/select/selectitem",
          "label": "Link",
          "value": "link"
        }
      }
    }
  }
}
```

It will result in one of the two following UI representation (modal or side panel): 

### Modal
![Dialog example tab1](dialog-example-tab1.png)

![Dialog example tab2](dialog-example-tab2.png)
### Side panel
![Dialog example side panel tab1](dialog-example-side-panel-tab1.png)

![Dialog example side panel tab2](dialog-example-side-panel-tab2.png)

## Data structure
The data structure depends on the `name` property. 

- In the simplest example property value is saved directly as a resource property. 
```json
"title": {
  "sling:resourceType": "wcm/dialogs/components/textfield",
  "label": "Title",
  "name": "title"
}
```
In above example, the `title` is added directly as a resource property.
![Simple data property](dialog-data-simple.png)

- There is also a possibility to manipulate data from other resources by using a path in the `name` property:
```json
"alt": {
  "sling:resourceType": "wcm/dialogs/components/textfield",
  "name": "image/alt",
  "label": "Alt text"
}
```
In above example, the `alt` property is saved as an image property from the header context.
![Child resource property](dialog-data-path.png)

- Another example of manipulating data from other resources is using a multifield. This dialog field `name` property defines a node under which are created other resources with properties defined in the multifield.
```json
"urls": {
  "sling:resourceType": "wcm/dialogs/components/multifield",
  "name": "urls",
  "label": "Footer URLs",
  "labelField": {
    "sling:resourceType": "wcm/dialogs/components/textfield",
    "name": "label",
    "label": "Label"
  },
  "addressField": {
    "sling:resourceType": "wcm/dialogs/components/pathpicker",
    "name": "address",
    "label": "URL"
  }
}
```
![Multifield resource property](dialog-data-multifield.png)

## Validation
Validation in dialog fields is used to verify if the value meets the criteria of the particular field. There are two levels:

### BackEnd validation
WebSight supports the validation of dialog values on BackEnd side. If the value is incorrect, then it won’t be saved and the dialog can’t be submitted. The author will see a proper error message.
![](dialog-backend-validation.png)

#### Custom validator
To prepare a custom validator you have to extend an `pl.ds.websight.dialog.spi.DialogValidator` form `pl.ds.websight:websight-dialogs-service` as an OSGi `@Component(service = DialogValidator.class)`. 
You have to implement the following methods:

- `boolean supports(Resource resource)` - should return whether the dialog resource is supported by this validator - this check will be done for each resource representing dialog fields
- `String validate(Resource resource, Map<String, Object> propertiesToSave)` - should return a validation result. In the case of:
    - `success` - return null
    - `error` - return String with a proper message, which will be displayed in Dialog

## Show/hide dialog fields
By default, all dialog components are visible, but there is a possibility to hide them.

### Context
To show or hide a particular field depending on dialog context you can use a `ws:disallowedContext` parameter.

```json
"ws:disallowedContext": ["edit"]
```

To hide an element in dialog, the request from Front-End which fetches it has to contain the additional parameter `context`. If the context value matches one of `ws:dissallowedContext` values, then the field won’t be rendered. To check request details, go to the [Swagger documentation](http://localhost:8080/apps/apidocs#/apps/websight-dialogs-service/docs/api.html).

### Conditions
To show or hide a particular field depends on other fields’ state you can use a `ws:display` node.
This node should contain children defining conditions to show the element. If the component has such a child node it’s hidden by default. It’s required to fulfill at least one condition to show the component.

Each condition should have two properties:

- sourceName - with the name of the component whose value would be checked
- values - with one or more values. At least one of them should match the source field value to fulfill the condition.

Example conditions configurations:

- with single value:
```json
"ws:display": {
  "condition": {
    "sourceName": "fieldName",
    "values": "option1"
  }
}
```
- with multiple values:
```json
"ws:display": {
  "condition": {
    "sourceName": "fieldName",
    "values": ["option1", "option2", "option3"]
  }
}
```

Example dialog definition:

```json
{
  "sling:resourceType": "wcm/dialogs/dialog",
  "hideall": {
    "sling:resourceType": "wcm/dialogs/components/toggle",
    "name": "hideall",
    "label": "Hide all other elements"
  },
  "container": {
    "sling:resourceType": "wcm/dialogs/components/container",
    "showrequiredfield": {
      "sling:resourceType": "wcm/dialogs/components/toggle",
      "name": "showrequiredfield",
      "label": "Show required field"
    },
    "requiredfield": {
      "sling:resourceType": "wcm/dialogs/components/textfield",
      "name": "requiredfield",
      "label": "Required field",
      "required": true,
      "ws:display": {
        "condition": {
          "sourceName": "showrequiredfield",
          "values": "true"
        }
      }
    },
    "ws:display": {
      "condition": {
        "sourceName": "hideall",
        "values": "false"
      }
    }
  }
}
```


- Initial dialog state:
![Inital dialog state](dialog-show-hide-1.png)


- Checking "Hide all other elements" hides the second field.
![Dialog with "Hide all other elements" checked](dialog-show-hide-2.png)


- Checking "Show required field" shows another field.
![Dialog with "Show required field" checked](dialog-show-hide-3.png)

## Default state
Some components allow defining a default state. E.g. checkbox can be checked by default, and select can have the default option. It is significant to keep using those components with the same default state used in backend models.
Example:

- dialog field definition with h2 selected by default:
```json
{
  "sling:resourceType": "wcm/dialogs/components/radio",
  "name": "headingLevel",
  "label": "Heading level",
  "h1": {
    "sling:resourceType": "wcm/dialogs/components/radio/option",
    "label": "H1",
    "value": "h1"
  },
  "h2": {
    "sling:resourceType": "wcm/dialogs/components/radio/option",
    "label": "H2",
    "selected": true,
    "value": "h2"
  },
  "h3": {
    "sling:resourceType": "wcm/dialogs/components/radio/option",
    "label": "H3",
    "value": "h3"
  }
}
```
- model class:
```java 
@Model(adaptables = Resource.class)
public class TitleComponent {

  @Inject
  @Default(values = "h2")
  private String headingLevel;

}
```

You can use [Component template](../components/definition/#template) to achieve a similar effect, but only if you add a new component. There is no easy solution to update all existing resources, so the initial content is useless if you extend the existing component. In that case, you need to use default states.

## Modal vs. side panel
As shown earlier, a single dialog structure could be presented to the authors in two different ways: the modal and the side panel.
By default, the single configuration will be used for both, so the same fields will appear in the same order and layout on both versions. 

### Purposes
In general, the modal is used to edit (almost) all the various properties with advanced cross-field validations.
The side panel is a light-weight version of that. It's more suitable for quick edits that can be checked on the page content right away.

### Hiding fields
As the purposes might vary between the two, it's possible to decide field-by-field if it should appear on both or only on one of them.
The mechanism used to achieve that is the `ws:disallowedContext` parameter (see more details [above](TODO link)). The two contexts that can be disabled are `modal` and `sidepanel`.

#### Hiding a field in side panel
```json
{
  "sling:resourceType": "wcm/dialogs/dialog",
  "shadows": {
    "sling:resourceType": "wcm/dialogs/components/toggle",
    "name": "shadows",
    "label": "Use shadows",
    "ws:disallowedContext": ["sidepanel"]
  },
  "style": {
    "sling:resourceType": "wcm/dialogs/components/select",
    "label": "Style",
    "name": "style",
    "primary": {
      "sling:resourceType": "wcm/dialogs/components/select/selectitem",
      "label": "Primary",
      "value": "primary"
    },
    "secondary": {
      "sling:resourceType": "wcm/dialogs/components/select/selectitem",
      "label": "Secondary",
      "selected": true,
      "value": "secondary"
    },
    "link": {
      "sling:resourceType": "wcm/dialogs/components/select/selectitem",
      "label": "Link",
      "value": "link"
    }
  }
}
```
![Dialog example hide on side panel (modal)](dialog-hide-on-side-panel-modal.png)

![Dialog example hide on side panel (side panel)](dialog-hide-on-side-panel-side-panel.png)

#### Hiding a field in modal
```json
{
  "sling:resourceType": "wcm/dialogs/dialog",
  "shadows": {
    "sling:resourceType": "wcm/dialogs/components/toggle",
    "name": "shadows",
    "label": "Use shadows"
  },
  "style": {
    "sling:resourceType": "wcm/dialogs/components/select",
    "label": "Style",
    "name": "style",
    "ws:disallowedContext": ["modal"],
    "primary": {
      "sling:resourceType": "wcm/dialogs/components/select/selectitem",
      "label": "Primary",
      "value": "primary"
    },
    "secondary": {
      "sling:resourceType": "wcm/dialogs/components/select/selectitem",
      "label": "Secondary",
      "selected": true,
      "value": "secondary"
    },
    "link": {
      "sling:resourceType": "wcm/dialogs/components/select/selectitem",
      "label": "Link",
      "value": "link"
    }
  }
}
```
![Dialog example hide on modal (modal)](dialog-hide-on-modal-modal.png)

![Dialog example hide on modal (side panel)](dialog-hide-on-modal-side-panel.png)

### Different config for modal and side panel
To achieve an even better authoring experience, it's also possible to define completely separate layout and order for the two ways of editing.

```json
{
  "sling:resourceType": "wcm/dialogs/dialog",
  "tabs": {
    "sling:resourceType": "wcm/dialogs/components/tabs",
    "properties": {
      "sling:resourceType": "wcm/dialogs/components/tab",
      "label": "Properties",
      "ws:disallowedContext": ["sidepanel"],
      "headingLevel": {
        "sling:resourceType": "wcm/dialogs/components/include",
        "path": "/libs/howlite/components/common/headinglevel"
      },
      "headingSize": {
        "sling:resourceType": "wcm/dialogs/components/include",
        "path": "/libs/howlite/components/common/headingsize"
      }
    },
    "styles": {
      "sling:resourceType": "wcm/dialogs/components/tab",
      "label": "Styles",
      "ws:disallowedContext": ["sidepanel"],
      "styleVariant": {
        "sling:resourceType": "wcm/dialogs/components/include",
        "path": "/libs/howlite/components/common/stylevariant"
      }
    },
    "sidepanel": {
      "sling:resourceType": "wcm/dialogs/components/tab",
      "label": "Properties",
      "ws:disallowedContext": ["modal"],
      "headingLevel": {
        "sling:resourceType": "wcm/dialogs/components/include",
        "path": "/libs/howlite/components/common/headinglevel"
      },
      "headingSize": {
        "sling:resourceType": "wcm/dialogs/components/include",
        "path": "/libs/howlite/components/common/headingsize"
      },
      "styleVariant": {
        "sling:resourceType": "wcm/dialogs/components/include",
        "path": "/libs/howlite/components/common/stylevariant"
      }
    }
  }
}
```
In the example above, we create a configuration of three tabs. The first two will only appear on the modal, while the third will only appear on the side panel.
The third tab includes all three fields that are available on the first two tabs, this way it allows the author to edit all the properties in the side panel in one tab, but define separation on the modal.

![Dialog example different config (modal, first tab)](dialog-different-modal-tab-1.png)

![Dialog example different config (modal, second tab)](dialog-different-modal-tab-2.png)

![Dialog example different config (side panel)](dialog-different-side-panel.png)
