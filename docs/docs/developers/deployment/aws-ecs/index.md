#  Deployment with Amazon ECS
In this tutorial you will learn how to deploy an application created in the [setup guide](../../../developers/setup/) to [Amazon Web Services](https://aws.amazon.com/) cloud using [Docker Compose](https://docs.docker.com/cloud/ecs-integration/).

The [Docker Compose CLI is fully integrated with Amazon Elastic Container Service (ECS)](https://docs.docker.com/cloud/ecs-integration/). It allows to create / manage the task definitions, tasks, services using Compose YAML configuration files. Docker Compose CLI relies on [CloudFormation](https://aws.amazon.com/cloudformation/) to manage AWS Resources. 

Docker allows to define the platform in declarative way. Switching between local and ECS environments is as easy as switching [Docker Context](https://docs.docker.com/engine/context/working-with-contexts/) (any addtional AWS configurations exists in the Docker Compose YAML file).

!!! warning "Notice"

    Setting up the WebSight CMS CE environment in AWS presented in this tutorial is not in the AWS Free Tier. 
    If you run the instance according to this guide, the costs will incur (~3$/day).

!!! abstract "Prerequisites"

    After finishing [Creating and developing WebSight CMS project guide](../../../developers/setup/) you should already have:
    
    - [Docker](https://docs.docker.com/get-docker/) installed and running on your local machine.
    - Java 17 (e.g. [AdoptOpenJDK 17](https://adoptium.net/)) and [Maven](https://maven.apache.org/download.cgi) installed on your local machine.
    
    To complete this tutorial, you will additionally need:

    - [AWS account](https://aws.amazon.com/console/) with [permissions for Docker Compose ECS integraion](https://docs.docker.com/cloud/ecs-integration/#run-an-application-on-ecs).
    - [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) set up locally with your AWS credentials.

## Step 1: AWS configuration

1. [Registering a new domain](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html#domain-register-procedure) with `Route53`.
2. [Request a public certificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) using `AWS Certificate Manager`. 
3. [Validate domain ownership](https://docs.aws.amazon.com/acm/latest/userguide/domain-ownership-validation.html) for the created public certificate.
4. [Create two private image repositories](https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-create.html):
    - Set the CMS image `Repository name` to `<your-project-name>-cms-ce`, e.g. `luna-cms-ce`.
    - Set the Nginx image `Repository name` to `<your-project-name>-nginx-ce`, e.g. `luna-nginx-ce`.

## Step 2: Project configuration
In this step, we will start from the project generated in the [Setup guide](../../../developers/setup/) and update Docker and Maven configuration files.

### Docker
For simplicity, we set remote environment configuration in the same repository as the project.

1. Create `environment/remote` directory.
2. Create `environment/remote/admin_password.txt` and `environment/remote/mongo_password.txt` files and fill them with random password (both should be single-line documents).
3. Copy `environment/local/docker-compose.yml` to `environment/remote`.
4. Add `secrets` section in `environment/local/docker-compose.yml`:
```yaml
secrets:
  admin_password:
    file: ./admin_password.txt
  mongo_password:
    file: ./mongo_password.txt
```
5. Replace `volumes` section to:
```yaml
volumes:
  cms_logs:
  mongo_repository:
  site_repository:
```
6. Change `cms` service definition to:
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
    - `CMS_ECR_IMAGE_URI` - replace with CMS repository URI from [AWS ECR dashboard](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-info.html)
    - `x-aws-protocol` - configuration for AWS ALB, read more [here](https://docs.docker.com/cloud/ecs-compose-examples/#service)

7. Change `mongo` service definition to:
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
8. Change `nginx` service definition to:
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
    - `NGINX_ECR_IMAGE_URI` - replace with Nignx repository URI from [AWS ECR dashboard](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-info.html)
    - `x-aws-protocol` - configuration for AWS ALB, read more [here](https://docs.docker.com/cloud/ecs-compose-examples/#service)
9. Add `x-aws-cloudformation` section with Load Balancer configuration:
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
    - `CERTIFICATE_ARN` - replace with ARN of the certificate generated in [AWS Configuration](#step-1-aws-configuration) step.
10. [Create Docker ECS context](https://docs.docker.com/cloud/ecs-integration/#create-aws-context) named `ws-ecs`:
    - `docker context create ecs ws-ecs`
11. Update `distribution/src/main/docker/nginx/default.conf` Nginx config with additional health endpoint:
```apache
    location /health {
        access_log off;
        add_header  Content-Type    text/html;
        return 200;
    }
```

To find more information about using Docker Compose with AWS Elastic Container Service, please read [Deploying Docker containers on ECS](https://docs.docker.com/cloud/ecs-integration/).

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

Alternatively, you can check the above configuration in [WebSight Starter Distribution POM](https://github.com/websight-io/starter/blob/main/distribution/pom.xml) (where Maven profiles are used).

## Step 3: Build and deployment

1. [Log in to ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html#cli-authenticate-registry).
2. In the project root run `mvn clean install -D docker.cms-project.name=<CMS_ECR_IMAGE_URI> -D docker.nginx.name=<NGINX_ECR_IMAGE_URI> -D docker.skip.push=false`.
3. Switch Docker context to ECS `docker context use ws-ecs`.
4. From `environment/remote` run `docker compose --project-name "websight-in-aws" up`. It may take a couple of minutes to finish.
5. Route your domain to Application Load Balancer (that was created by the Docker Compose in the previous step) by [creating a new Hosted Zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer.html).

## Step 4: Verification

1. Check [ECS Console](https://console.aws.amazon.com/ecs) and see if all cluster services are running.
2. Open WebSight CMS CE admin panel on `<your-domain>:8443`. Use the `wsadmin` as login and content of `environment/remote/admin_password.txt` as password.

## Cleaning up
To stop incurring AWS costs, follow these steps:

1. From `environment/remote` run `docker compose --project-name "websight-in-aws" down`. It may take a couple of minutes.
2. [Delete EFS file systems](https://docs.aws.amazon.com/efs/latest/ug/delete-efs-fs.html) for `cms_logs` ,`mongo_repository`, and `site_repository` volumes.
3. [Delete Route53 Hosted Zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DeleteHostedZone.html) created in [Deployment](#step-3-build-and-deployment) step.
4. [Delete certificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-delete.html) created in [AWS Configuration](#step-1-aws-configuration) step.
5. [Delete ECR repositories](https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-delete.html) created in [AWS Configuration](#step-1-aws-configuration) step.

## AWS best practices
This section descirbes best practices for deploying WebSight CE DXP to AWS ECS.

### Logs and monitoring
It is always worth configuring logs and observing basic metrics for your instance.

Thanks to the Docker Compose integration with AWS ECS, the [AWS CloudWatch Logs service is automatically configured for your containers](https://docs.docker.com/cloud/ecs-integration/#view-application-logs).

Additionally, you can monitor basic metrics thanks to the [CloudWatch metrics for the Fargate](https://docs.aws.amazon.com/AmazonECS/latest/userguide/cloudwatch-metrics.html) launch type.

### Secrets
Use [Docker secrets](https://docs.docker.com/engine/swarm/secrets/) for storing any sensitive data (like passwords, tokens, etc.). Docker Compose integration with AWS ECS creates a new secret in the [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/) for each [secred defined in the compose configuration file](https://docs.docker.com/cloud/ecs-compose-features/#secrets). See the examples below.

#### Custom CMS admin credentials
WebSight CE CMS enables configuring a custom admin username and password. The default values for admin user username/password are `wsadmin/wsadmin`.

You can configure a custom username with `WS_ADMIN_USERNAME` [environment variable](https://docs.docker.com/compose/environment-variables/).

To configure a custom password use `admin.password` secret. You will need secret files available at deploy time next to the compose file:


``` title="admin_password.txt"
s33cretP@ssword
```
and reference it in the compose configuration:

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

By default, ECS Tasks configured by the Docker Compose integration have public IP assigned. 
Therefore, you should consider securing MongoDB, which by default starts with no username/password configured.
Read more about securing MongoDB containers [here](https://hub.docker.com/_/mongo).