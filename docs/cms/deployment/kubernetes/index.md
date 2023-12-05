#  Deployment with Kubernetes
This tutorial explains how to deploy our demo site _Luna_ (see [quick start guide](/cms/quick-start/)) to the cloud using [Kubernetes](https://kubernetes.io/). In this tutorial we use [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine) but the setup is not limited to Google Cloud Platform (GCP) and can be used with any Kubernetes cluster like [Amazon EKS](https://aws.amazon.com/eks/), [Azure Kubernetes Service](https://azure.microsoft.com/en-us/services/kubernetes-service/), etc.

[WebSight Helm chart](https://github.com/websight-io/charts) bootstraps the CMS that supports two types of storage backends: [Document Storage (MongoDB)](https://jackrabbit.apache.org/oak/docs/nodestore/documentmk.html) and [Segment Storage (TAR)](https://jackrabbit.apache.org/oak/docs/nodestore/segment/overview.html). In this tutorial, we use the MongoDB instance.

!!! abstract "Before you start"
    Make sure you have:

    - your [GCP environment set](https://cloud.google.com/run/docs/setup)
    - Google Kubernetes Engine API [enabled](https://cloud.google.com/apis/docs/getting-started#enabling_apis)
    - [`kubectl`](https://kubernetes.io/docs/tasks/tools/) installed (if you use [Docker Desktop, `kubectl` should already be installed](https://docs.docker.com/desktop/kubernetes/#use-the-kubectl-command))
    - [`helm`](https://helm.sh/docs/intro/install/#helm) installed

## Step 1: Kubernetes cluster configuration

1. [Create a Kubernetes cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster) consisting of a single nodes pool with the following configuration:
    - number of nodes: `3`
    - zone: any zone of your choice, e.g. `europe-west1-b` to place the cluster in Belgium
    - machine type: `e2-standard-2 (2 vCPUs, 8 GB memory)`
    ```bash
    gcloud container clusters create my-websight-cms \
      --num-nodes 3 --zone europe-west1-b --machine-type e2-standard-2
    ```

    Running the command above may take a couple of minutes to finish. It will also configure `kubectl` to use the cluster.

## Step 2: Install prerequisites

1. [Install an NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/#digital-ocean)
   ```bash
   helm upgrade --install ingress-nginx ingress-nginx \
     --repo https://kubernetes.github.io/ingress-nginx \
     --namespace ingress-nginx --create-namespace
   ```
2. Create `cms` namespace:
   ```bash
   kubectl create namespace cms
   ```
3. Install MongoDB in the `cms` namespace using Helm:
    ```bash
    helm install mongodb oci://registry-1.docker.io/bitnamicharts/mongodb --version 14.3.0 \
      --set auth.enabled=true \
      --set auth.rootUser="mongoadmin" \
      --set auth.rootPassword="mongoadmin" \
      --set architecture="replicaset" \
      -n cms
    ```
    At the end of the installation, you should see the following message with MongoDB connection details:
    ```bash
    MongoDB can be accessed on the following DNS name(s) and ports from within your cluster:

    mongodb-0.mongodb-headless.cms.svc.cluster.local:27017
    mongodb-1.mongodb-headless.cms.svc.cluster.local:27017
    ```
    You will use the connection details in the next section.

    !!! tip "MongoDB"
        For simplicity in this step we use [Bitnami MongoDB Helm chart](https://bitnami.com/stack/mongodb/helm) with default configuration for replicaset architecture (2 data-bearing members and 1 arbiter).

## Step 3: Deploy CMS

1. Create `my-websight-cms` directory and download the following files into it:
    - Example [values.yaml](https://raw.githubusercontent.com/websight-io/charts/main/websight-cms/examples/luna-proxy/values.yaml) with the configuration for _Luna_ demo site
    ```bash
    curl -O https://raw.githubusercontent.com/websight-io/charts/main/websight-cms/examples/luna-proxy/values.yaml
    ```
    - Nginx [configuration](https://raw.githubusercontent.com/websight-io/charts/main/websight-cms/examples/luna-proxy/luna-site.conf.template) for the CMS Proxy
    ```bash
    curl -O https://raw.githubusercontent.com/websight-io/charts/main/websight-cms/examples/luna-proxy/luna-site.conf.template
    ```
2. Find the external IP address of the Ingress Controller in your cluster (`YOUR_CLUSTER_IP`):
    ```bash
    kubectl get svc ingress-nginx-controller -n ingress-nginx -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
    ```
3. Update the `proxy` configuration in `values.yaml` with the IP address from the previous step:
    ```yaml
    proxy:
      enabled: true
      env:
        - name: NGINX_HOST
          value: <YOUR_CLUSTER_IP>.nip.io
      sites:
        - name: luna
          host: luna.<YOUR_CLUSTER_IP>.nip.io
          configMapKeyRef:
            name: luna-site-config
            key: luna-site.conf.template
    ```
3. Deploy the Nginx proxy configuration as a ConfigMap:
    ```bash
    kubectl create configmap luna-site-config --from-file=luna-site.conf.template -n cms
    ```
4. Deploy the CMS using Helm and the configuration from `values.yaml` (replace `<YOUR_CLUSTER_IP>` with the IP address from the 2nd step):
    ```bash
    helm upgrade --install websight-cms websight-cms \
        --repo https://websight-io.github.io/charts \
        --set cms.persistence.mode=mongo \
        --set cms.persistence.mongo.hosts='mongodb-0.mongodb-headless.cms.svc.cluster.local:27017\,mongodb-1.mongodb-headless.cms.svc.cluster.local:27017' \
        --set cms.livenessProbe.initialDelaySeconds=120 \
        --set cms.ingress.enabled=true \
        --set cms.ingress.host=cms.<YOUR_CLUSTER_IP>.nip.io \
        --namespace cms \
        -f values.yaml --wait
    ```
    It may take about 1-2 minute of minutes to finish.
    At the end of the installation, you should see the following message:
    ```bash
    Your release is named websight-cms.

    Your WebSight CE instance is starting...
    WebSight instance will be available at: 
    - CMS Panel: http://cms.35.241.128.172.nip.io

    Sites:
    - luna: http://luna.35.241.128.172.nip.io

    Happy WebSight helming!
    ```

## Step 4: Verification

1. Check the [Kubernetes Workloads Dashboard](https://console.cloud.google.com/kubernetes/workload/overview) to verify that all pods are running.
2. Open the WebSight CMS admin panel on `http://cms.<YOUR_CLUSTER_IP>.nip.io/` (SSL is not covered in this guide). Use the credentials `wsadmin`/`wsadmin` to log in.
3. Publish some _Luna_ pages (see [Publish demo site guide](/cms/quick-start/#part-b-publish-demo-site) for help).
4. Open `http://luna.<YOUR_CLUSTER_IP>.nip.io/` to see the demo page.

## Cleanup

1. When finished, you can delete your Kubernetes cluster along with all workloads using:
```bash
gcloud container clusters delete my-websight-cms --zone europe-west1-b
```