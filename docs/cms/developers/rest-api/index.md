# REST API

## Overview

The WebSight REST framework, which is part of WebSight CMS, provides a mechanism for creating and calling backend endpoints in a unified way.

This document describes how to prepare custom REST endpoints using the framework.

## Dependencies configuration

Preparing custom REST endpoints requires adding a WebSight Rest framework dependency:

```xml title="pom.xml"
<dependency>
    <groupId>pl.ds.websight</groupId>
    <artifactId>websight-rest-framework</artifactId>
    <version>1.0.0</version>
    <scope>provided</scope>
</dependency>
```

## Model class
Let’s start by creating a Model class, which is required to interact with a REST endpoint. This is a [Sling Model](https://sling.apache.org/documentation/bundles/models.html) class that automatically maps the [SlingHttpServletRequest](https://sling.apache.org/apidocs/sling12/org/apache/sling/api/SlingHttpServletRequest.html) object to the object fields.

Notes about using the REST Action Model class:

- The name must end with `RestModel`
- It must be annotated with `Model` and adaptable from type `SlingHttpServletRequest` like: `@Model(adaptables = SlingHttpServletRequest.class)` Read more about [Sling Model in the documentation](https://sling.apache.org/documentation/bundles/models.html#registration-of-sling-models-classes-via-bnd-plugin-1)
- Fields can be annotated with `javax.validation.constraints` annotations to validate the model
- The REST Action Model can optionally implement `Validatable` to provide additional validation (see the [Validation section](#validation) below for more on this)

```java
package pl.ds.websight.rest.example;

import java.util.Optional;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

@Model(adaptables = SlingHttpServletRequest.class)
public class HelloNameRestModel {

    @SlingObject 
    SlingHttpServletRequest request;

    public String getName() {
        return Optional.ofNullable(request.getParameter("name"))
            .orElse("ERROR") ;
    }
}
```

### Validation

If a model has to meet some validation rules before processing the request, the model class can implement `pl.ds.websight.rest.framework.Validatable`. It requires implementing the public `Errors validate()` method. If the returned value is not empty, the response is returned with `VALIDATION_FAILURE` status, and the response entity field contains information about the error.

```java
package pl.ds.websight.rest.example;

import java.util.Optional;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import pl.ds.websight.rest.framework.Errors;
import pl.ds.websight.rest.framework.Errors.Error;
import pl.ds.websight.rest.framework.Validatable;


@Model(adaptables = SlingHttpServletRequest.class)
public class HelloNameRestModel implements Validatable {

    @SlingObject 
    SlingHttpServletRequest request;

    public String getName() {
        return Optional.ofNullable(request.getParameter("name"))
            .orElse("ERROR") ;
    }

    @Override
    public Errors validate() {
        Errors errors = Errors.createErrors();

        if (Optional.ofNullable(request.getParameter("name")).isEmpty()) {
            errors.add(Error.of("name", null, "The name parameter is required"));
        }

        return errors;
    }
}
```

### WebSight Request Parameters Support

To simplify model class implementation you can use a WebSight Request Parameters Support.

To do so, you must add a dependency:

```xml title="pom.xml"
<dependency>
    <groupId>pl.ds.websight</groupId>
    <artifactId>websight-request-parameters-support</artifactId>
    <version>1.0.0</version>
    <scope>provided</scope>
</dependency>
```

This provides the `pl.ds.websight.request.parameters.support.annotations.RequestParameter` annotation mapping HTTP [servlet request parameter values](https://docs.oracle.com/javaee/6/api/javax/servlet/ServletRequest.html#getParameterValues(java.lang.String)) (which support both a single value and arrays) to properties with the following types:

- Single value objects (`String`, `Boolean`, `Integer`, `Double`, `Long`, `Float`, `Short`, `Enum`)
- Arrays (`Collection`, `List`)
Now you can simplify the model class:

```java
package pl.ds.websight.rest.example;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import pl.ds.websight.request.parameters.support.annotations.RequestParameter;


@Model(adaptables = SlingHttpServletRequest.class)
public class HelloNameRestModel {

    @RequestParameter 
    private String name;

    public String getName() {
        return name;
    }
}
```

## REST Action class

Notes about the REST action class:
- The name must end with `RestAction`
- It must be annotated with `org.osgi.service.component.annotations.Component`
- It must be annotated with `pl.ds.websight.rest.framework.annotations.SlingAction` Optionally we can set a `HttpMethod` for `RestAction`. Two options are available: `POST` (default) and `GET`.
- It must implement the `RestAction` generic interface with REST Action Model type

The model lifecycle works as follows:

- The request is adapted to the REST Action Model class
- The REST Action Model class is validated according to `javax.validation.constraints` annotations. In the even of validation failure, a response is returned with `VALIDATION_FAILURE` status and the response entity field contains info about errors
- If the REST Action Model implements `Validatable` then the `Validatable.validate()` method is executed. If returned Errors are not empty, the response is returned with `VALIDATION_FAILURE` status and the response entity field contains info about errors
- The model is passed to `RestAction.perform(Object)` and the returned response is sent to the client
- If a `RuntimeException` occurs during processing, a response with status `ERROR` is returned

Let’s prepare an example using the REST Action class:

```java
package pl.ds.websight.rest.example;

import org.osgi.service.component.annotations.Component;
import pl.ds.websight.rest.framework.RestAction;
import pl.ds.websight.rest.framework.RestActionResult;
import pl.ds.websight.rest.framework.annotations.SlingAction;


@Component
@SlingAction(SlingAction.HttpMethod.GET)
public class GetHelloNameRestAction implements RestAction<HelloNameRestModel, String> {

    @Override
    public RestActionResult<String> perform(HelloNameRestModel model) {
        return RestActionResult.success("Hello " + model.getName());
    }
}
```

Now you can call:
`http://localhost:8080/apps/websight-example-module/bin/get-hello-name.action?name=world`

### Context limitation

#### Primary Types

Optionally, the class can be annotated with `pl.ds.websight.rest.framework.annotations.PrimaryTypes`. This lets us limit REST action for a given node type, and it can be invoked only in the context of a node with a given type.
For example, consider the following:

```java
package pl.ds.websight.rest.example;

import org.osgi.service.component.annotations.Component;
import pl.ds.websight.rest.framework.RestAction;
import pl.ds.websight.rest.framework.RestActionResult;
import pl.ds.websight.rest.framework.annotations.PrimaryTypes;
import pl.ds.websight.rest.framework.annotations.SlingAction;

@Component
@SlingAction(SlingAction.HttpMethod.GET)
@PrimaryTypes("nt:folder")
public class GetHelloNameRestAction implements RestAction<HelloNameRestModel, String> {

    @Override
    public RestActionResult<String> perform(HelloNameRestModel model) {
        return RestActionResult.success("Hello " + model.getName());
    }
}
```

In this example, our RestAction is available only in a folder resource context:
`http://localhost:8080/path/to/folder.websight-example-module.get-hello-name.action?name=world`

#### Resource Types

The class can also be annotated with `pl.ds.websight.rest.framework.annotations.ResourceTypes`. This lets us limit the REST action for a given resource type.

```java
package pl.ds.websight.rest.example;

import org.osgi.service.component.annotations.Component;
import pl.ds.websight.rest.framework.RestAction;
import pl.ds.websight.rest.framework.RestActionResult;
import pl.ds.websight.rest.framework.annotations.ResourceTypes;
import pl.ds.websight.rest.framework.annotations.SlingAction;

@Component
@SlingAction(SlingAction.HttpMethod.GET)
@ResourceTypes("example/components/helloname")
public class GetHelloNameRestAction implements RestAction<HelloNameRestModel, String> {

    @Override
    public RestActionResult<String> perform(HelloNameRestModel model) {
        return RestActionResult.success("Hello " + model.getName());
    }
}
```

### Using resources in REST Action

From now on, our action is strictly related to the resource, so we can use it in our model:

```java
package pl.ds.websight.rest.example;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

@Model(adaptables = SlingHttpServletRequest.class)
public class HelloNameRestModel {

    @SlingObject
    Resource resource;
    
    public String getResourcePath() {
        return resource.getPath();
    }
}
```

And in action:

```java
package pl.ds.websight.rest.example;

import org.osgi.service.component.annotations.Component;
import pl.ds.websight.rest.framework.RestAction;
import pl.ds.websight.rest.framework.RestActionResult;
import pl.ds.websight.rest.framework.annotations.PrimaryTypes;
import pl.ds.websight.rest.framework.annotations.SlingAction;

@Component
@SlingAction(SlingAction.HttpMethod.GET)
@PrimaryTypes("nt:folder")
public class GetHelloNameRestAction implements RestAction<HelloNameRestModel, String> {

    @Override
    public RestActionResult<String> perform(HelloNameRestModel model) {
        return RestActionResult.success("Hello from " + model.getResourcePath());
    }

}
```

## Response Format

Since we already know how to create and call our action, let’s examine the response. It can contain the following properties:
- status - one of SUCCESS/FAILURE
- entity - the action result
- message - an informational message
- messageDetails - informational message details

```json
{
  "status":"",
  "entity":[],
  "message": "",
  "messageDetails": ""
}
```

## Swagger browser
Our RestAction can be documented in a Swagger browser UI available via http://localhost:8080/apps/apidocs

To do so, we have to use a Maven plugin:

```xml title="pom.xml"
<plugin>
 <groupId>pl.ds.websight</groupId>
 <artifactId>websight-rest-swagger-maven-plugin</artifactId>
 <version>1.0.1</version>
 <executions>
   <execution>
     <goals>
       <goal>generate</goal>
     </goals>
   </execution>
 </executions>
 <configuration>
   <title>Example Service API</title>
   <actionPackages>
     <param>pl.ds.websight.rest.example</param>
   </actionPackages>
 </configuration>
</plugin>
```

We must also add a configuration in bnd.bnd:

```bnd
Bundle-Name: Example Service
Sling-Bundle-Resources: /apps/example-service/docs
WebSight-Swagger-Index: /apps/example-service/docs/api.html
```

## WebSight REST ESM Client
Using REST actions on the front end of WebSight exposes a REST client under `/apps/websight-rest-esm-client/web-resources/RestClient.js`. 

To use it, do the following:
- Import its definition:

```js
import RestClient from 'websight-rest-esm-client/RestClient';
```

- Create the client for your project (e.g. `hello-service`) containing actions:

```js
this.restClient = new RestClient('example-service');
```

- Invoke the GET/POST method:

```js
this.restClient.get({
    action: 'get-hello-name',
    parameters: { name: 'WebSight' },
    onSuccess: async (data) => {
        ...
    },
    onFailure: (data) => {
        ...
    },
    onNonFrameworkError: (error) => {
        ...
    },
});
```

!!! Info "Note"
        RestClient utilizes an auto notifications mechanism. This means that if the response contains a message property, a popup message will be displayed on the WebSight dashboard that provides information about the request status.