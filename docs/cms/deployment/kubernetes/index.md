#  Deployment with Kubernetes
This tutorial explains how to deploy our demo site _Luna_ (see [quick start guide](/cms/quick-start/)) to [Kubernetes](https://kubernetes.io/) using a [Digital Ocean Managed Kubernetes cluster](https://www.digitalocean.com/products/kubernetes).

!!! warning "Notice"

    Setting up WebSight CMS on Digital Ocean via the steps presented in this tutorial will incur Digital Ocean hosting costs of approximately 2 dollars per day.


!!! abstract "Prerequisites"
   
    To complete this tutorial, you will also need:

    - A [Digital Ocean account](https://cloud.digitalocean.com/)
    - The [Digital Ocean CLI](https://docs.digitalocean.com/reference/doctl/) installed
    - [`kubectl`](https://kubernetes.io/docs/tasks/tools/) installed (if you use [Docker Desktop, `kubectl` should already be installed](https://docs.docker.com/desktop/kubernetes/#use-the-kubectl-command))
    - [`helm`](https://helm.sh/docs/intro/install/#helm) installed

## Step 1: Kubernetes cluster configuration

!!! info ""

    At the moment of writing this tutorial, Digital Ocean does **not** support `persistent volumes` with `ReadWriteMany` access mode. For simplicity's sake, we create a single node Kubernetes cluster to work with `ReadWriteOnce` access mode.

1. Start by [Authenticating `doctl` with an API token](https://docs.digitalocean.com/reference/doctl/how-to/install/). Set API token scopes as follows: `Read` and `Write`
2. [Create a Kubernetes cluster](https://docs.digitalocean.com/products/kubernetes/how-to/create-clusters/) using the Control Panel with the following options:
    - scaling type: `Fixed size`
    - machine type: `Basic nodes`
    - node plan: `Professional plans 8 GB RAM / 4 vCPUs`
    - nodes: `1`
3. [Configure your `kubectl` context for the new cluster](https://docs.digitalocean.com/products/kubernetes/how-to/connect-to-cluster/#doctl)

## Step 2: Project configuration

1. [Set up an NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/#digital-ocean)
2. Create a `values.yml` file with the following content:

    ```yaml
    nginx:
        replicas: 1
        host: <YOUR_CLUSTER_IP>.nip.io

    ingress:
        enabled: true
        hosts:
            cms: "cms.<YOUR_CLUSTER_IP>.nip.io"
            sites: 
              - "luna.<YOUR_CLUSTER_IP>.nip.io"
    ```
    - `YOUR_CLUSTER_IP` - replace with Digital Ocean Load Balancer IP (you can obtain it by running `doctl compute load-balancer list`)

    See [WebSight Helm chart documentation](https://github.com/websight-io/charts#parameters) for more details.

## Step 3: CMS Deployment

1. Run:
    ```bash
    helm upgrade --install websight-cms websight-cms \
        --repo https://websight-io.github.io/charts \
        --namespace websight-cms --create-namespace \
        -f values.yaml
    ```
    It may take a couple of minutes to finish.

## Step 4: Verification

1. Check the [Kubernetes Dashboard](https://cloud.digitalocean.com/kubernetes/clusters) to verify that all pods are running.
2. Open the WebSight CMS admin panel on `http://cms.<YOUR_CLUSTER_IP>.nip.io/` (SSL is not covered in this guide). Use the credentials `wsadmin`/`wsadmin` to log in.
3. Publish some _Luna_ pages (see [Publish demo site guide](/cms/quick-start/#part-b-publish-demo-site) for help).
4. Open `http://luna.<YOUR_CLUSTER_IP>.nip.io/` to see the demo page.

## Cleanup

1. When finished, you can [delete your Kubernetes cluster](https://docs.digitalocean.com/products/kubernetes/how-to/destroy-clusters/) along with the Load Balancer and volumes.
