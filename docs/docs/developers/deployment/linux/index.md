# Deployment with Linux Docker Compose

This guide describes an inexpensive setup with predictable monthly pricing. We will use a single Ubuntu server with Docker Compose running containers.

!!! Warning "Notice"
        This setup does not focus on reliability (e.g. backups, recovery), scalability and monitoring aspects. For the production environments, we recommend using the managed container services. See the [AWS ECS deployment guide](../aws-ecs/) for more details.


!!! abstract "Prerequisites"
    After finishing [Creating and developing WebSight CMS project guide](../../../developers/create-and-develop-project/) you should already have:
    
    - [Docker](https://docs.docker.com/get-docker/) installed and running on your local machine.
    - Java 17 (e.g. [AdoptOpenJDK 17](https://adoptium.net/)) and [Maven](https://maven.apache.org/download.cgi) installed on your local machine.
    
    To complete this tutorial, you will additionally need:

    - virtual machine (min 2CPUs / 4GB RAM) with Ubuntu 22.x installed
    - container registry for your project images

In this guide we will use `DigitalOcean` cloud to:

- set up a virtual machine (Droplet)
- configure private container registry

## Step 1: Droplet Setup

!!! info "Notice"
        If you have your own vitual machine with Ubuntu installed, you can skip this step and go directly to [step 2](#step-2-install-docker).

[Create a Droplet](https://docs.digitalocean.com/products/droplets/how-to/create/) with the following specification:

  - OS Image: `Ubuntu 22.04 (LTS) x64`
  - Size: `Basic: 2 Intel CPUs / 4GB RAM / 80GB NVMe SSDs`
  - [choose SSH keys authentication](https://docs.digitalocean.com/products/droplets/how-to/create/#authentication) and add your SSH public key to Droplet

At the time of writing this guide the cost of the Droplet is **$24.00/month**.

## Step 2: Install Docker

On your virtual machine install Docker Engine & Plugins according to the [Ubuntu installation docs](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository).

## Step 3: Container Registry Setup

!!! info "Notice"
        If you have already Docker Registry, you can skip this step and go directly to [step 4](#step-4-push-images-to-docker-registry).

[Create a basic private Container Registry in DigitalOcean](https://docs.digitalocean.com/products/container-registry/quickstart/).

At the time of writing this guide the cost of the Basic Container Registry is **$5.00/month**.

## Step 4: Push images to Docker Registry

In this step, we will start from the project generated in the [Setup guide](../../../developers/setup/) and update the Maven configuration file.

1. Update the `io.fabric8:docker-maven-plugin` plugin configuration in `distribution/pom.xml`. 
    - Add the following `buildx` extension to _cms_ and _nginx_ images `<build>` sections:
```xml
                <buildx>
                  <platforms>
                    <platform>linux/amd64</platform>
                    <platform>linux/arm64</platform>
                  </platforms>
                </buildx>
```
    - Add the following `execution`:
```xml
          <execution>
            <id>push-docker-image</id>
            <phase>package</phase>
            <goals>
              <goal>push</goal>
            </goals>
          </execution>
```

2. [Login to the container registry](https://docs.digitalocean.com/products/container-registry/how-to/use-registry-docker-kubernetes/#docker-integration) with
```bash
docker login registry.digitalocean.com
```
and provide your DigitalOcean API token.

3. Push your images to the container registry
```bash
mvn clean install \ 
-Ddocker.cms-project.name=registry.digitalocean.com/DO_REGISTRY_NAME/websight-cms-linux-box \
-Ddocker.nginx.name=registry.digitalocean.com/DO_REGISTRY_NAME/nginx-linux-box
```
where `DO_REGISTRY_NAME` is your configured container registry name

## Step 5: Deploy Containers

From the Droplet console run:

1. Download Docker Compose file
```bash
wget https://www.websight.io/scripts/docker-compose.yml
```

2. Update the downloaded `docker-compose.yml` file and replace:
    - `public.ecr.aws/ds/websight-cms-ce:luna-1.1.0` -> `registry.digitalocean.com/DO_REGISTRY_NAME/websight-cms-linux-box`
    - `public.ecr.aws/ds/websight-nginx-ce:luna-1.1.0` -> `registry.digitalocean.com/DO_REGISTRY_NAME/nginx-linux-box`

3. Login to the container registry
```bash
docker login registry.digitalocean.com
```
and provide your DigitalOcean API token.

4. Run WebSight CMS CE containers with
```bash
docker compose up -d
```

## Step 6: Verification
Open WebSight CMS CE admin panel on `DROPLET_IP:8080`. Use the `wsadmin`/`wsadmin` as login / password.