#  Deployment with Kubernetes
In this tutorial you will learn how to deploy an application created in the [setup guide](../../../developers/setup/) to [Kubernetes](https://kubernetes.io/) using the [Digital Ocean Managed Kubernetes clusters](https://www.digitalocean.com/products/kubernetes).

!!! warning "Notice"

    Setting up the WebSight CMS in Digital Ocean presented in this tutorial is not free. 
    If you run the instance according to this guide, the costs will incur (~2$/day).


!!! abstract "Prerequisites"

    After finishing [Creating and developing WebSight CMS project guide](../../../developers/setup/) you should already have:
    
    - [Docker](https://docs.docker.com/get-docker/) installed and running on your local machine.
    - Java 17 (e.g. [AdoptOpenJDK 17](https://adoptium.net/)) and [Maven](https://maven.apache.org/download.cgi) installed on your local machine.
    
    To complete this tutorial, you will additionally need:

    - [Digital Ocean account](https://cloud.digitalocean.com/)
    - [Digital Ocean CLI](https://docs.digitalocean.com/reference/doctl/) installed
    - [`kubectl`](https://kubernetes.io/docs/tasks/tools/) installed (with [Docker Desktop kubectl should be installed](https://docs.docker.com/desktop/kubernetes/#use-the-kubectl-command))
    - [`helm`](https://helm.sh/) installed

## Step 1: Digital Ocean configuration

!!! info ""

    Digital Ocean does **not** support `persistent volumes` with `ReadWriteMany` access mode. For simplicity sake, we create a single node Kubernetes cluster to work with `ReadWiteOnce` access mode.

1. [Authenticate `doctl` with an API token](https://docs.digitalocean.com/reference/doctl/how-to/install/)
    - API token scopes: `Read` and `Write`
2. [Create Kubernetes cluster](https://docs.digitalocean.com/products/kubernetes/how-to/create-clusters/) using the Control Panel
    - scaling type: `Fixed size`
    - machine type: `Basic nodes`
    - node plan: `Professional plans 8 GB RAM / 4 vCPUs`
    - nodes: `1`



3. [Configure `kubectl` context for the new cluster](https://docs.digitalocean.com/products/kubernetes/how-to/connect-to-cluster/#doctl)
4. [Create Container Registry](https://docs.digitalocean.com/products/container-registry/quickstart/)
    - plan: `Basic`


## Step 2: Kubernetes cluster configuration

1. [Set up Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/#digital-ocean)
2. [Integrate Container Registry with Kubernetes cluster](https://docs.digitalocean.com/products/container-registry/how-to/use-registry-docker-kubernetes/#kubernetes-integration)

## Step 2: Project configuration

### Maven

1. Update `io.fabric8:docker-maven-plugin` plugin configuration in `distribution/pom.xml`. 
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
2. Add `<docker.skip.push>true</docker.skip.push>` property to the main `pom.xml`.

### Environment

1. Create `values.yml` file in `environment/k8s` with the following content

    ```yaml
    cms:
        image: 
            repository: registry.digitalocean.com/<YOUR_REGISTRY_NAME>/cms
            tag: latest

    nginx:
        replicas: 1
        image: 
            repository: registry.digitalocean.com/<YOUR_REGISTRY_NAME>/nginx
            tag: latest

    ingress:
        enabled: true
        hosts:
            cms: "cms.<YOUR_CLUSTER_IP>.nip.io"
            site: "site.<YOUR_CLUSTER_IP>.nip.io"
    ```
    - `YOUR_REGISTRY_NAME` - replace with Digital Ocean Container Registry name
    - `YOUR_CLUSTER_IP` - replace with Digital Ocean Load Balancer IP (you may obtain it by running `doctl compute load-balancer list`)

    See [WebSight Helm chart documentation](https://github.com/websight-io/websight-ce-helm#parameters) for more details.

## Step 3: Build & deployment

1. [Configure Docker to `push` to and `pull` from Container Registry](https://docs.digitalocean.com/products/container-registry/how-to/use-registry-docker-kubernetes/#docker-integration).
2. In the project root run 
    ```bash
    mvn clean install \
        -D docker.cms-project.name=registry.digitalocean.com/<YOUR_REGISTRY_NAME>/cms \
        -D docker.nginx.name=registry.digitalocean.com/<YOUR_REGISTRY_NAME>/nginx \
        -D docker.skip.push=false
    ```
3. Switch `kubectl` context to your cluster in Digital Ocean (`kubectl config use-context <CONTEXT_NAME>`)
3. From `environment/k8s` run:
    ```bash
    helm repo add websight https://websight-io.github.io/websight-ce-helm
    helm repo update websight
    helm install my-websight websight/websight-ce -f values.yml
    ```
    Use `helm upgrade my-websight websight/websight-ce -f values.yml` for updating the installation.

 `docker compose --project-name "websight-in-aws" up`. It may take a couple of minutes to finish.
5. Route your domain to Application Load Balancer (that was created by the Docker Compose in the previous step) by [creating a new Hosted Zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer.html).

## Step 4: Verification

1. Check [Kubernetes Dashboard](https://cloud.digitalocean.com/kubernetes/clusters) and see if all PODs are running.
2. Open WebSight CMS admin panel on `https://cms.<YOUR_CLUSTER_IP>.nip.io/` (SSL is not covered in this guide). Use the `wsadmin`/`wsadmin` to login.

## Cleanup

1. Delete Kubernetes cluster and Load Balancer.
2. Delete volumes.