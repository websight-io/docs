# Kubernetes Architecture
Kubernetes (k8s) makes it easy to automate deployments and management of WebSight CMS components with the most popular cloud providers. This document describes what Kubernetes resources are required to run and scale WebSight Community Edition.

## Kubernetes Resources

- `Ingress` is a set of rules defining how to route authors and site visitors requests. `Ingress Controller` processes these rules and exposes them to the load balancer provided by the cloud provider. WebSight supports multi-site management, so our Ingress contains rules for authors and site visitors from multiple domains (paths).
- `CMS` service and pods that read/write content from/to MongoDB and create/delete (publish/unpublish) generated HTML pages/images/other assets in Public Storage
- `MongoDB` service and pod that stores the content in a persistent volume
- `Web Server` service and pods that read pre-generated HTML pages from Public Storage
- `Public Storage` persistent volume share between CMS and Web Server pods

The following diagram presents the WebSight k8s architecture

![WebSight - kubernetes architecture](kubernetes-architecture-overview.png)

!!! Info "Limitation"
    WebSight Community Edition uses Public Storage persistent volume for all published assets (HTML pages, images, and JS / CSS scripts). As a consequence, CMS and Web Server pods need PersistanceVolumeClaims (PVCs) with the [ReadWriteMany access mode](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) when more than one node worker in the cluster is configured.
