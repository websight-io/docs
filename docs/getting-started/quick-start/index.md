# Quick Start Guide

Follow this guide to quickly run the WebSight local instance using Docker.

## Part A: Run local instance using Docker

!!! info "Prerequisites"

    Before going any further, please make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine and running.

### 1. Join closed WebSight testers group

Currently we are running alpha tests. If you would like to join, please drop us an email. We will contact you and share the WebSight Docker image.

<figure markdown>
  [Ask to join WebSight closed tests group :fontawesome-regular-paper-plane:](#){ .md-button }
</figure>

### 2. Create Docker Compose manifest

Create `docker-compose.yml` file. Paste the content presented below and save the file on your hard drive.

``` yaml title="docker-compose.yml"
version: "3.9"

services:
  ice:
    image: <image-you-will-receive-after-joining-closed-tests-group>
    ports:
      - "8080:8080"
    volumes:
      - websight_repository:/websight/repository
      - websight_html:/websight/docroot
  nginx:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - websight_html:/usr/share/nginx/html:ro

volumes:
  websight_repository:
  websight_html:
```

### 3. Run the local instance

Open the terminal next to the `docker-compose.yml` file and run the following command:

```
docker compose up
```

The fresh WebSight instance will start in a couple of seconds. Now, you may enter [http://localhost:8080/](http://localhost:8080/) to open the WebSight admin panel.
Log in with `admin` username and `admin` as a password.

To stop the environment use `ctrl + c`. You may run it later exactly the same as it was started for the first time.

---

## Part B: First steps

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus odio purus, tempus congue ultrices id, malesuada sit amet metus. Vestibulum at orci commodo, eleifend libero vel, auctor ipsum. Pellentesque non iaculis urna. Quisque hendrerit est sem, id ultricies nulla facilisis nec. Suspendisse non lacinia sapien. Duis sed dui mollis sapien pretium hendrerit ut quis dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin tempor ante a ante ultricies varius. Sed sem velit, tristique ac placerat a, viverra vel nibh. Nunc purus nulla, blandit eget ornare venenatis, efficitur eget nisl. In hac habitasse platea dictumst. Pellentesque sagittis congue efficitur. Quisque orci tortor, commodo a faucibus et, hendrerit et quam. Nullam sed luctus purus.

## Next steps

Curabitur lacinia nunc at pretium dapibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sodales condimentum hendrerit. Phasellus eleifend sem eu eleifend sollicitudin. Sed vel ligula ut turpis finibus scelerisque nec sit amet lacus. Praesent euismod ipsum eu malesuada ultricies. Curabitur pretium elementum lectus et viverra.
