#  Deployment with Kubernetes
This tutorial explains how to deploy an application created in the [setup guide](../../../developers/setup/) to [Kubernetes](https://kubernetes.io/) using a [Digital Ocean Managed Kubernetes cluster](https://www.digitalocean.com/products/kubernetes).

!!! warning "Notice"

    Setting up WebSight CMS on Digital Ocean via the steps presented in this tutorial will incur Digital Ocean hosting costs of approximately 2 dollars per day.


!!! abstract "Prerequisites"

    After finishing [Creating and developing WebSight CMS project guide](../../../developers/setup/) you should already have:
    
    - [Docker](https://docs.docker.com/get-docker/) installed and running on your local machine.
    - Java 17 (e.g. [AdoptOpenJDK 17](https://adoptium.net/)) and [Maven](https://maven.apache.org/download.cgi) installed on your local machine.
    
    To complete this tutorial, you will also need:

    - A [Digital Ocean account](https://cloud.digitalocean.com/)
    - The [Digital Ocean CLI](https://docs.digitalocean.com/reference/doctl/) installed
    - [`kubectl`](https://kubernetes.io/docs/tasks/tools/) installed (if you use [Docker Desktop, kubectl should already be installed](https://docs.docker.com/desktop/kubernetes/#use-the-kubectl-command))
    - [`helm`](https://helm.sh/) installed

## Step 1: Digital Ocean configuration

!!! info ""

    Digital Ocean does **not** support `persistent volumes` with the `ReadWriteMany` access mode. For purposes of simplicity, we'll create a single-node Kubernetes cluster to work with the `ReadWiteOnce` access mode.

1. Start by [Authenticating `doctl` with an API token](https://docs.digitalocean.com/reference/doctl/how-to/install/). Set API token scopes as follows: `Read` and `Write`
2. [Create a Kubernetes cluster](https://docs.digitalocean.com/products/kubernetes/how-to/create-clusters/) using the Control Panel with the following options:
    - scaling type: `Fixed size`
    - machine type: `Basic nodes`
    - node plan: `Professional plans 8 GB RAM / 4 vCPUs`
    - nodes: `1`



3. [Configure your `kubectl` context for the new cluster](https://docs.digitalocean.com/products/kubernetes/how-to/connect-to-cluster/#doctl)
4. [Create a Container Registry](https://docs.digitalocean.com/products/container-registry/quickstart/). The `Basic` plan is sufficient.


## Step 2: Kubernetes cluster configuration

1. [Set up an NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/#digital-ocean)
2. [Integrate the Container Registry with your Kubernetes cluster](https://docs.digitalocean.com/products/container-registry/how-to/use-registry-docker-kubernetes/#kubernetes-integration)

## Step 2: Project configuration

### Maven

1. Update the `io.fabric8:docker-maven-plugin` plugin configuration in `distribution/pom.xml` as follows. 
    - Add the following `buildx` extension to the _cms_ and _nginx_ images `<build>` sections:
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

1. Create a `values.yml` file in the `environment/k8s` directory with the following content:

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
    - `YOUR_CLUSTER_IP` - replace with Digital Ocean Load Balancer IP (you can obtain it by running `doctl compute load-balancer list`)

    See [WebSight Helm chart documentation](https://github.com/websight-io/charts#parameters) for more details.

## Step 3: Build and deployment

1. [Configure Docker to `push` to and `pull` from Container Registry](https://docs.digitalocean.com/products/container-registry/how-to/use-registry-docker-kubernetes/#docker-integration).
2. In the project root run:
    ```bash
    mvn clean install \
        -D docker.cms-project.name=registry.digitalocean.com/<YOUR_REGISTRY_NAME>/cms \
        -D docker.nginx.name=registry.digitalocean.com/<YOUR_REGISTRY_NAME>/nginx \
        -D docker.skip.push=false
    ```
3. Switch the `kubectl` context to your cluster in Digital Ocean (`kubectl config use-context <CONTEXT_NAME>`)
3. From `environment/k8s` run:
    ```bash
    helm repo add websight https://websight-io.github.io/charts
    helm repo update websight
    helm install my-websight websight/websight-cms -f values.yml
    ```
    Use `helm upgrade my-websight websight/websight-cms -f values.yml` for updating the installation.
    It may take a couple of minutes to finish.
5. Route your domain to the Application Load Balancer (which you created using Docker Compose in the previous step) by [creating a new Hosted Zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer.html).

## Step 4: Verification

1. Check the [Kubernetes Dashboard](https://cloud.digitalocean.com/kubernetes/clusters) to verify that all pods are running.
2. Open the WebSight CMS admin panel on `https://cms.<YOUR_CLUSTER_IP>.nip.io/` (SSL is not covered in this guide). Use the credentials `wsadmin`/`wsadmin` to log in.

## Cleanup

1. When finished, you can [delete your Kubernetes cluster](https://docs.digitalocean.com/products/kubernetes/how-to/destroy-clusters/) along with the Load Balancer and volumes.
2. You may also delete your Container Registry.
