# Creating and developing WebSight CMS project

This document describes the WebSight project’s initial setup, instance overview, and application development. We will generate a new project from Maven archetype, check what it contains and how to develop the application. All the screens and examples will be referring to the project generated during the guide.

This document describes the WebSight project’s initial setup and instance overview. We will generate a new project from Maven archetype and check what it contains. The generated structure is an example starting point for projects which is recommended and suitable for a typical web application based on WebSight CMS Community edition.

## Generate project

To initialize the project Maven archetype will be used. To continue you should have Maven installed. Check your Maven version. 

``` script
mvn --version
Apache Maven 3.8.5 (3599d3414f046de2324203b78ddcf9b5e4388aa0)
...
```

System requirements: Java 17, Mave 3.8.5 +

Open the command line at an empty folder and generate a project.

Use _groupId_, _artifactId_, and version params to declare Maven artifacts for your project.
Use _projectName_, _projectId_ and package to define your project name used in UI, id used for technical needs (application resources paths, Docker images names) and root package for Java code.

Use _archetypeVersion_ parameter to set archetype version you want to use.
You can check the latest version [here](https://search.maven.org/search?q=g:pl.ds.websight%20a:websight-cms-ce-project-archetype).

Use _cmsVersion_ parameter to set WebSight CMS version used by the generated project.
You can check the latest version in the [Release Notes](../../release-notes).

Example command:
``` script
mvn archetype:generate                                     \
  -DarchetypeGroupId=pl.ds.websight                        \
  -DarchetypeArtifactId=websight-cms-ce-project-archetype  \
  -DarchetypeVersion=1.1                                   \
  -DgroupId=my.groupId                                     \
  -DartifactId=my-artifactId                               \
  -Dversion=1.0.0-SNAPSHOT                                 \
  -DprojectName="Example Project"                          \
  -DprojectId=example-project                              \
  -Dpackage=com.example.project                            \
  -DcmsVersion=1.1.0
```

Following structure should be created:
```
.
└── my-artifactId
    ├── README.md
    ├── application
    ├── content
    ├── distribution
    ├── environment
    ├── pom.xml
    └── tests
```

## Project structure
The generated project structure is an example starting point for projects which is recommended and suitable for a typical web application based on WebSight CMS Community edition.

Overview of the modules:

- `application` - components related code and scripts
    - `backend` - contains application elements (components, templates, etc.) and Java code
    - `frontend` - contains application frontend
- `content` - contains sample content created with use of application
- `distribution` - builds a distribution of the project - instance feature model and docker images for runtime components
- `environment` - contains scripts and files used to build environment
    - `local` - starts local environment
- `tests` - responsible for the automatic distribution validation
    - `content` - contains content used for end to end tests
    - `end-to-end` - end-to-end tests validating distribution

### Distribution and environment

Important information is that the project also contains the server. Distribution module is responsible for building the Docker images delivering platform runtime. 
Delivering a new version of an application is done by delivering new images of the runtime environment which will include the application. 
During development it is possible to deploy application modules to running instances without rebuilding the Docker images. 
Distribution module delivers Docker images with:

- CMS - image with WebSight CMS with your application installed
- Nginx - HTTP server serving published content

Additionally raw MongoDB image is used - MongoDB is used as a data store for content like pages or assets created on CMS (but not for your application which is installed on the CMS instance as OSGi bundles - more details in chapter about developing application).

Everything is combined by environment which is using Docker Compose to combine all the containers into one runtime environment. See environment/local module for details.

This illustration shows the runtime environment and roles:

![Runtime environment and roles](diagrams/generated/runtime-docker-compose.png)

### Application

Application is delivered as OSGi bundles and installed on WebSight CMS instance image during building the project.
Generated project contains 2 application modules

- `backend` - contains application elements (components, templates, etc.) and Java code
- `frontend` - webpack project containing application frontend

The Test module is used for end-to-end validation of the distribution, and especially your application. Test ‘content’ module contains content assembled with use of the application for easier validation of all cases of the delivered functionality.

‘Content’ module delivers content assembled with use of the application installed to WebSight CMS instance as starting point for the content structure.

## Build and Run the instance

To build the project use Maven command:

``` script
mvn clean install
```

Add e2e profile to execute end-to-end tests:

``` script
mvn clean install -P e2e
``` 

You should see successful end-to-end test execution in the log:
![End-to-end test execution log](img02.png)

Execution should end with successful build:
![Successful build log](img03.png)

To run the instance Docker is needed. 
Check Docker installation by running in command line

``` script
docker --version
Docker version 20.10.14
```

If you need you can download the Docker Desktop [here](https://www.docker.com/)

See also README.md in environment and environment/local folders for the details about the running environment.

After build of the project to start a local instance go to the environment/local folder and run:
```docker compose up```

Local WebSight CMS with your application installed is running at [http://localhost:8080/](http://localhost:8080/) (login with wsadmin/wsadmin)
Published content is available locally at [http://localhost/](http://localhost)

!!! info "Building docker image fails with `/var/run/docker.sock` (issue on Mac)"
    The issue leads to the following error message

    ```bash
    [ERROR] Failed to execute goal io.fabric8:docker-maven-plugin:0.40.1:build (build-docker-image) on project ws-linux-box-distribution: Execution build-docker-image of goal io.fabric8:docker-maven-plugin:0.40.1:build failed: No <dockerHost> given, no DOCKER_HOST environment variable, no read/writable '/var/run/docker.sock' or '//./pipe/docker_engine' and no external provider like Docker machine configured -> [Help 1]
    ```

    Follow the Docker Maven Plugin [issue](https://github.com/fabric8io/docker-maven-plugin/issues/1616) to check the current status and available workarounds.

## Instance overview

After login you will be redirected to the Spaces list. In WebSight CMS content is organized in Spaces. More details in the next sections.
On the list you can see the Space created with use of the generated application and delivered in the ‘content’ module containing initial project content. 

[http://localhost:8080/apps/websight/index.html/content::spaces](http://localhost:8080/apps/websight/index.html/content::spaces )
![WebSight CMS - Spaces](img04.png)

After clicking on the space name Pages dashboard is open with 1 page delivered in initial content. You can manage your pages here and navigate to Assets dashboard (to manage assets) or open Pages editor to edit page content.

[http://localhost:8080/apps/websight/index.html/content/example-project/pages](http://localhost:8080/apps/websight/index.html/content/example-project/pages)
![WebSight CMS - Pages](img05.png)

In the Right top corner there is the Admin tools menu with links for administration tools. See also tools overview at tools page:

[http://localhost:8080/apps/admin](http://localhost:8080/apps/admin)
![WebSight CMS - Tools](img06.png)

## The next steps

You learned how to set up a new project for WebSight CMS. Now, we recommend exploring more details:

- [Application development](../development/)
- [Components development](../development/components/)
- [Dialogs](../development/dialogs/)