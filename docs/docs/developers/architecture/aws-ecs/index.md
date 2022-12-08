# Amazon ECS WebSight Architecture
The container services available on AWS make it easy to manage WebSight CMS Community Eedition infrastructure and containers. For container orchestration, you can choose between **Amazon Elastic Container Service (ECS)** and **Amazon Elastic Kubernetes Service (EKS)**. For infrastructure provisioning, you can use **Amazon Elastic Compute Cloud (EC2)**, which provides full control over the compute environment, or **Fargate**, a serverless compute option in which the infrastructure provisioning is managed by AWS.

## Physical architecture with Elastic Container Service
This document describes WebSight deployment with **Amazon ECS** and **Fargate**. These are the key principles for this tooling:

- There is no additional charge for the Amazon ECS cluster; you pay only for AWS resources that you create to store and run the application
- ECS uses simple concepts (`services`, `tasks` and `containers`), similar to those in Docker Compose, which enables [Docker ECS integration](https://docs.docker.com/cloud/ecs-integration/)
- The developer experience is almost the same localy and in the cloud
- ECS integrates natively with AWS services like `CloudTrail`, `CloudWatch`, `Elastic Container Registry`, and `Elastic File System`
- With Fargate, developers do not have to worry about the underlying infrastructure. This enables a serverless experience, and you pay only for the vCPU and memory resources that your application requests

The following diagram presents the physical architecture of the WebSight CMS CE environment in AWS.

![WebSight - logical architecture](physical-architecture-with-aws-ecs.jpg)

### Amazon Elastic Container Service
Amazon ECS is a fully managed container orchestration service. It uses such abstractions such as `services`, `tasks`, `task definitions`, `containers`. In brief, these mean the following:

- A task is a collection of one or more container configurations
- Tasks are configured with task definitions and are used to launch containers
- Services guarantee that the required number of tasks are runnning

Each service (`nginx`, `cms`, `mongo`) runs a single task that launches a single container.

Read more about Amazon ECS [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html).

### Amazon Elastic File System
Amazon Elastic File System (Amazon EFS) is a fully managed, serverless file system with native AWS ECS integration. WebSight uses EFSs to store published experiences, content and logs. Read more details about EFS [here](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html).

### Amazon Application Load Balancer
Application Load Balancer handles all request from both site visitors (HTTPS on port `443`) and authors (HTTPS on port `8443`), and forwards them to `nginx` or `cms` ECS services. ALB also terminates HTTPS; all routing between ALB and ECS uses HTTP (`80` / `8080`) because the connection is private. Read more details [here](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html).
