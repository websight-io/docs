#  Deployment with Amazon ECS
This tutorial explains how to deploy an application created in the [setup guide](../../../developers/setup/) to the [Amazon Web Services](https://aws.amazon.com/) cloud using [Docker Compose](https://docs.docker.com/cloud/ecs-integration/).

The [Docker Compose CLI fully integrates with the Amazon Elastic Container Service (ECS)](https://docs.docker.com/cloud/ecs-integration/). It allows you to create and manage the task definitions, tasks and services using Compose YAML configuration files. The Docker Compose CLI relies on [CloudFormation](https://aws.amazon.com/cloudformation/) to manage AWS Resources.

Docker allows users to define environments in a declarative way. As a result, switching between local environments and ECS environments is as easy as switching your [Docker Context](https://docs.docker.com/engine/context/working-with-contexts/) (Any AWS-specific configurations is stored in the Docker Compose YAML file.)

!!! warning "Notice"

    If you set up the WebSight CMS CE environment on AWS presented by following the steps in this tutorial, you will incur AWS fees of approximately 3 dollars per day, because these steps are not compatible with the AWS free tier.

!!! abstract "Prerequisites"

    After completing the [Creating and developing WebSight CMS project guide](../../../developers/setup/) you should have:
    
    - [Docker](https://docs.docker.com/get-docker/) installed and running on your local machine.
    - Java 17 (e.g. [AdoptOpenJDK 17](https://adoptium.net/)) and [Maven](https://maven.apache.org/download.cgi) installed on your local machine.
    
    To complete this tutorial, you will also need:

    - An [AWS account](https://aws.amazon.com/console/) with [permissions for Docker Compose ECS integraion](https://docs.docker.com/cloud/ecs-integration/#run-an-application-on-ecs).
    - The [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) set up on your local machine and configured with your AWS credentials.

## Step 1: AWS configuration

1. [Register a new domain](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html#domain-register-procedure) with `Route53`.
2. [Request a public certificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) using `AWS Certificate Manager`. 
3. [Validate domain ownership](https://docs.aws.amazon.com/acm/latest/userguide/domain-ownership-validation.html) for the created public certificate.
4. [Create two private image repositories](https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-create.html):
    - Set the CMS image `Repository name` to `<your-project-name>-cms-ce`, e.g. `luna-cms-ce`.
    - Set the NGINX image `Repository name` to `<your-project-name>-nginx-ce`, e.g. `luna-nginx-ce`.

## Step 2: Project configuration
In this step, we will start with the project generated in the [Setup guide](../../../developers/setup/) and update our Docker and Maven configuration files as needed.

### Docker
For the sake of simplicity, we set the remote environment configuration in the same repository as the project.

1. Create an `environment/remote` directory.
2. Create `environment/remote/admin_password.txt` and `environment/remote/mongo_password.txt` files and fill them with random passwords (both should be single-line documents).
3. Copy `environment/local/docker-compose.yml` to `environment/remote`.
4. Add a `secrets` section in `environment/local/docker-compose.yml`:
```yaml
secrets:
  admin_password:
    file: ./admin_password.txt
  mongo_password:
    file: ./mongo_password.txt
```
5. Replace the `volumes` section with:
```yaml
volumes:
  cms_logs:
  mongo_repository:
  site_repository:
```
6. Change the `cms` service definition to:
```yaml
  cms:
    image: <CMS_ECR_IMAGE_URI>
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 2048M
    ports:
      - target: 8080
        published: 8080
        x-aws-protocol: http
    environment:
      - WS_ADMIN_USERNAME=wsadmin
      - MONGODB_HOST=mongo
      - MONGODB_PORT=27017
      - MONGODB_USERNAME=mongoadmin
    volumes:
      - cms_logs:/websight/logs
      - site_repository:/websight/docroot
    secrets:
      - source: admin_password
        target: admin.password
      - source: mongo_password
        target: mongo.password
    depends_on:
      - mongo
```
    - `CMS_ECR_IMAGE_URI` - replace with the appropriate CMS repository URI from the [AWS ECR dashboard](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-info.html)
    - `x-aws-protocol` - configure according to your setup for AWS ALB; read more [here](https://docs.docker.com/cloud/ecs-compose-examples/#service)

7. Change the `mongo` service definition to:
```yaml
  mongo:
    image: mongo:4.4.6
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 4096M
    environment:
      - MONGO_INITDB_ROOT_USERNAME=mongoadmin
      - MONGO_INITDB_ROOT_PASSWORD_FILE=/run/secrets/mongo.password
    volumes:
      - mongo_repository:/data/db
    secrets:
      - source: mongo_password
        target: mongo.password
```
8. Change the `nginx` service definition to:
```yaml
  nginx:
    image: <NGINX_ECR_IMAGE_URI>
    ports:
      - target: 80
        published: 80
        x-aws-protocol: http
    volumes:
      - site_repository:/usr/share/nginx/html:ro
```
    - `NGINX_ECR_IMAGE_URI` - replace with the NGINX repository URI from [AWS ECR dashboard](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-info.html)
    - `x-aws-protocol` -  configure according to your setup for AWS ALB; read more [here](https://docs.docker.com/cloud/ecs-compose-examples/#service)
    
9. Add an `x-aws-cloudformation` section with a Load Balancer configuration:
```yaml
x-aws-cloudformation:
  Resources:
    Cms8080TargetGroup:
      Properties:
        HealthCheckProtocol: HTTP
        HealthCheckPort: 8080
        HealthCheckPath: /system/health
        Matcher:
          HttpCode: 200
    Nginx80TargetGroup:
      Properties:
        HealthCheckProtocol: HTTP
        HealthCheckPort: 80
        HealthCheckPath: /health
        Matcher:
          HttpCode: 200
    Cms8080Listener:
      Properties:
        Certificates:
          - CertificateArn: "<CERTIFICATE_ARN>"
        Protocol: HTTPS
        Port: 8443
    Nginx80Listener:
      Properties:
        Certificates:
          - CertificateArn: "<CERTIFICATE_ARN>"
        Protocol: HTTPS
        Port: 443
```
    - `CERTIFICATE_ARN` - replace with the ARN of the certificate generated in the [AWS Configuration](#step-1-aws-configuration) step.
10. [Create Docker ECS context](https://docs.docker.com/cloud/ecs-integration/#create-aws-context) named `ws-ecs`:
    - `docker context create ecs ws-ecs`
11. Update the `distribution/src/main/docker/nginx/default.conf` NGINX configuration with additional health endpoint settings:
```apache
    location /health {
        access_log off;
        add_header  Content-Type    text/html;
        return 200;
    }
```

To find more information about using Docker Compose with AWS Elastic Container Service, please read [Deploying Docker containers on ECS](https://docs.docker.com/cloud/ecs-integration/).

### Maven

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
2. Add the `<docker.skip.push>true</docker.skip.push>` property to the main `pom.xml`.

Alternatively, you can refer to the above configuration in [WebSight Starter Distribution POM](https://github.com/websight-io/starter/blob/main/distribution/pom.xml) (where Maven profiles are used).

## Step 3: Build and deployment

1. [Log in to ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html#cli-authenticate-registry).
2. In the project root run `mvn clean install -D docker.cms-project.name=<CMS_ECR_IMAGE_URI> -D docker.nginx.name=<NGINX_ECR_IMAGE_URI> -D docker.skip.push=false`.
3. Switch the Docker context to ECS `docker context use ws-ecs`.
4. From `environment/remote` run `docker compose --project-name "websight-in-aws" up`. It may take a couple of minutes to finish.
5. Route your domain to the Application Load Balancer that was created by Docker Compose in the previous step by [creating a new Hosted Zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer.html).

## Step 4: Verification

1. Check the [ECS Console](https://console.aws.amazon.com/ecs) to verify that all cluster services are running.
2. Open the WebSight CMS CE admin panel by navigating to `<your-domain>:8443` in a browser. Use `wsadmin` as the login name. The password is the password you configured in `environment/remote/admin_password.txt`.

## Cleaning up
To shut down your environment on AWS (and stop incurring AWS costs), follow these steps:

1. From `environment/remote` run `docker compose --project-name "websight-in-aws" down`. It may take a couple of minutes to complete.
2. [Delete the EFS file systems](https://docs.aws.amazon.com/efs/latest/ug/delete-efs-fs.html) for `cms_logs` ,`mongo_repository`, and `site_repository` volumes.
3. [Delete the Route53 Hosted Zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DeleteHostedZone.html) created in the [Deployment](#step-3-build-and-deployment) step.
4. [Delete the certificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-delete.html) created in the [AWS Configuration](#step-1-aws-configuration) step.
5. [Delete the ECR repositories](https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-delete.html) created in the [AWS Configuration](#step-1-aws-configuration) step.

## AWS best practices
This section descirbes best practices for deploying WebSight CE DXP to AWS ECS.

### Logs and monitoring
It's always a good idea to configure logs and observability metrics for your instance.

Thanks to the Docker Compose integration with AWS ECS, the [AWS CloudWatch Logs service is automatically configured for your containers](https://docs.docker.com/cloud/ecs-integration/#view-application-logs).

Additionally, you can monitor basic metrics using the [CloudWatch metrics for the Fargate](https://docs.aws.amazon.com/AmazonECS/latest/userguide/cloudwatch-metrics.html) launch type.

### Secrets
Use [Docker secrets](https://docs.docker.com/engine/swarm/secrets/) for storing any sensitive data (like passwords, tokens, etc.) within your environment. The Docker Compose integration with AWS ECS creates a new secret in the [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/) for each [secret defined in the Compose configuration file](https://docs.docker.com/cloud/ecs-compose-features/#secrets). See the examples below.

#### Custom CMS admin credentials
WebSight CE CMS enables configuration of a custom admin username and password. The default values for the admin user's username/password are `wsadmin/wsadmin`.

You can configure a custom username by setting the `WS_ADMIN_USERNAME` [environment variable](https://docs.docker.com/compose/environment-variables/).

To configure a custom password use the `admin.password` secret. To do this, first create a secrets file that is readable by Compose during deployment:


``` title="admin_password.txt"
s33cretP@ssword
```
Then, reference the file in the Compose configuration:

```yaml title="docker-compose.yml"
service:
  cms:
    secrets:
      - source: admin_password
        target: admin.password
secrets:
  admin_password:
    file: ./admin_password.txt
```
#### Custom MongoDB password

By default, ECS Tasks configured by the Docker Compose integration have public IP addresses assigned to them.
Therefore, you should consider securing MongoDB, which by default starts with no username/password configured.
Read more about securing MongoDB containers [here](https://hub.docker.com/_/mongo).
