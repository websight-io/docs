# Quick Start Guide

Follow this guide to quickly run the WebSight local instance using Docker.

## Part A: Run local instance using Docker

!!! info "Prerequisites"

    Before going any further, please make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine and running.

### 1. Join closed WebSight testers group

Currently we are running alpha tests. If you would like to join, please drop us an email. We will contact you and share the WebSight Docker image.

<figure markdown>
  [Join WebSight early reviewers group :fontawesome-regular-paper-plane:](mailto:websight@ds.pl){ .md-button }
</figure>

### 2. Create Docker Compose manifest

Create `docker-compose.yml` file. Paste the content presented below and save the file on your hard drive.

``` yaml title="docker-compose.yml"

version: "3.9"

services:
  wsce:
    image: <image-you-will-receive-after-joining-reviewers-group>
    ports:
      - "8080:8080"
    environment:
      WS_DEBUG: "true"
      WS_WEBSIGHT_LOG_LEVEL: "debug"
      WS_ADMIN_USERNAME: "wsadmin"
      WS_ADMIN_PASSWORD: "wsadmin"
      MONGODB_HOST: "mongo"
      MONGODB_PORT: 27017
    volumes:
      - wsce_logs:/websight/logs
      - site_repository:/websight/docroot
    links:
      - mongo
  nginx:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - site_repository:/usr/share/nginx/html:ro
  mongo:
    image: mongo:4.4.6
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=mongoadmin
      - MONGO_INITDB_ROOT_PASSWORD=mongoadmin
    volumes:
      - mongo_repository:/data/db

volumes:
  wsce_logs:
  mongo_repository:
  site_repository:

```

### 3. Run the local instance

Open the terminal next to the `docker-compose.yml` file and run the following command:

```
docker compose up
```

The fresh WebSight instance will start in a couple of seconds. Now, you may enter [http://localhost:8080/](http://localhost:8080/) to open the WebSight admin panel.
Log in with `wsadmin` username and `wsadmin` as a password.

!!! info "Tip"
  
    To stop the environment use `ctrl + c`. You may run it later exactly the same as it was started for the first time.

---

## Part B: Publish demo site

Your local environment is running now. The next step is to publish a demo site included in the distribution. 

### 1. Open the Websight admin panel

The WebSight admin panel runs at [http://localhost:8080/](http://localhost:8080/). Log in with `wsadmin` username and `wsadmin` as a password.

### 2. Select space for the demo site

We use _Spaces_ to organise content. Please open the space for the demo site _Luna_.

![Spaces](./quick-start-spaces.png)

### 3. Publish assets and the demo site

Open list of _Assets_ using the left sidebar. Go to folder _images_, select all subfolders and use action _Publish_.

![Assets publication](./quick-start-assets-publication.png)

Open list of _Pages_ using the left sidebar. Select all pages and use action _Publish_.

![Pages publication](./quick-start-pages-publication.png)

### 4. See the demo site

Congratulations! The demo site is available at [http://localhost/content/luna/pages/Homepage.html](http://localhost/content/luna/pages/Homepage.html).

![Published demo page](./quick-start-published-page.png)

## Part C: Update a page

Now that your local demo site is published, we would like to guide you through basic page amendments. You will update the home page for the demo site delivered together with the WebSight.

### 1. Open the Websight admin panel

The WebSight admin panel runs at [http://localhost:8080/](http://localhost:8080/). Log in with `wsadmin` username and `wsadmin` as a password.

### 2. Select space for the demo site

We use _Spaces_ to organise content. Please open the space for the demo site _Luna_.

![Spaces](./quick-start-spaces.png)

### 3. Edit the home page

Use _Pencil_ icon to open _Page editor_ for the home page. 

![Actions available for a page](./quick-start-page-actions.png)

Scroll down the content to section _Custom Made Engagement Rings_.

![Page section to be updated](./quick-start-page-section.png)

Find _Rich text editor_ on tab _Components_ and use drag & drop to place it just below the section title. 

![Rich text editor available in component tree](./quick-start-RTE-component.png)

Click on the new component to open available actions. Select pencil icon to edit properties.

![Actions available for RTE component](./quick-start-RTE-editing.png)

Copy & paste the following text on _General_ tab of the modal.

```
Every couple is unique and we want to deliver an engagement ring that is unique too – taking the tastes of the couple into account. We love having couples visit the store and work with them to create a unique custom engagement ring according to their tastes.
```

![RTE component properties](./quick-start-RTE-properties.png)

### 4. Publish changes

You updated the page. However, unpublished changes are not visible on the site yet. In the top right corner, open the dropdown and select action _Publish_.

![Publish page action](./quick-start-publish-page.png)

### 5. See the updated page

Congratulations! Your changes should be visible now at [http://localhost/content/luna/pages/Homepage.html](http://localhost/content/luna/pages/Homepage.html). 

![Publish page action](./quick-start-updated-page.png)
