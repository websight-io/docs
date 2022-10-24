# AWS best practices
This section descirbes best practices for deploying WebSight CE DXP to AWS ECS.

## Logs and monitoring
It is always worth configuring logs and observing basic metrics for your instance.

Thanks to the Docker Compose integration with AWS ECS, the [AWS CloudWatch Logs service is automatically configured for your containers](https://docs.docker.com/cloud/ecs-integration/#view-application-logs).

Additionally, you can monitor basic metrics thanks to the [CloudWatch metrics for the Fargate](https://docs.aws.amazon.com/AmazonECS/latest/userguide/cloudwatch-metrics.html) launch type.

## Secrets
Use [Docker secrets](https://docs.docker.com/engine/swarm/secrets/) for storing any sensitive data (like passwords, tokens, etc.). Docker Compose integration with AWS ECS creates a new secret in the [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/) for each [secred defined in the compose configuration file](https://docs.docker.com/cloud/ecs-compose-features/#secrets). See the examples below.

### Custom CMS admin credentials
WebSight CE CMS enables configuring a custom admin username and password. The default values for admin user username/password are `wsadmin/wsadmin`.

You can configure a custom username with `WS_ADMIN_USERNAME` [environment variable](https://docs.docker.com/compose/environment-variables/).

To configure a custom password use `admin.password` secret. You will need secret files available at deploy time next to the compose file:

> admin_password.txt
```
s33cretP@ssword
```

and reference it in the compose configuration:

> docker-compose.yml
```yaml
service:
  cms:
    secrets:
      - source: admin_password
        target: admin.password

secrets:
  admin_password:
    file: ./admin_password.txt
```

### Custom MongoDB password

By default, ECS Tasks configured by the Docker Compose integration have public IP assigned. 
Therefore, you should consider securing MongoDB, which by default starts with no username/password configured.
Read more about securing MongoDB containers [here](https://hub.docker.com/_/mongo).
