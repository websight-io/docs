# Deployment to Google Cloud Run

Cloud Run is a serverless platform that allows you to run `stateless` HTTP containers on a fully managed environment. WebSight CMS with its stateful nature is not a perfect fit for Cloud Run, but it's still possible to run it there for development purposes. However, here are some limitations to keep in mind:

- Lost data on restart: Cloud Run is a stateless platform, which means that any data stored in memory will be lost when the container is restarted. **This means that you will lose all your data when you restart the container (e.g. when you deploy new version of the container)**. This is not a problem for development purposes, but it's not recommended to use Cloud Run for production deployments.

!!! Warning "Notice"
        This guide enables running development purposes CMS instance. For a production environment we recommend using [Kubernetes](../kubernetes/) deployment.

!!! abstract "Before you start"
    Make sure you have:

       - your [GCP environment set](https://cloud.google.com/run/docs/setup)
       - Cloud Run API [enabled](https://cloud.google.com/apis/docs/getting-started#enabling_apis)

## Run environment

1. Save the following file to `cms-service.yaml` file:

    ```yaml
    apiVersion: serving.knative.dev/v1
    kind: Service
    metadata:
      annotations:
        run.googleapis.com/launch-stage: BETA
        run.googleapis.com/ingress: all
        run.googleapis.com/ingress-status: all
      name: websight-cms
    spec:
      template:
        metadata:
          annotations:
            autoscaling.knative.dev/maxScale: '1'
            autoscaling.knative.dev/minScale: '1'
            run.googleapis.com/client-name: cloud-console
            run.googleapis.com/cpu-throttling: 'false'
            run.googleapis.com/startup-cpu-boost: 'true'
          labels:
            run.googleapis.com/startupProbeType: Custom
        spec:
          containers:
          - args:
              - websight-cms-starter-tar
            image: europe-docker.pkg.dev/websight-io/public/websight-cms-starter:<IMAGE_TAG>
            livenessProbe:
              failureThreshold: 3
              httpGet:
                path: /system/health
                port: 8080
              initialDelaySeconds: 60
              periodSeconds: 10
              timeoutSeconds: 1
            ports:
            - containerPort: 8080
              name: http1
            resources:
              limits:
                cpu: 2000m
                memory: 4Gi
            startupProbe:
              failureThreshold: 3
              httpGet:
                path: /system/health
                port: 8080
              initialDelaySeconds: 60
              periodSeconds: 10
              timeoutSeconds: 1
            volumeMounts:
            - mountPath: /websight/repository
              name: repository-volume
          timeoutSeconds: 300
          volumes:
          - name: repository-volume
            emptyDir:
              sizeLimit: 2Gi
              medium: Memory
      traffic:
      - latestRevision: true
        percent: 100
    ```

2. Replace the `<IMAGE_TAG>` with `websight-cms-starter` image tag. You can list available tags with the following command:
    ```bash
    gcloud container images list-tags europe-docker.pkg.dev/websight-io/public/websight-cms-starter --format json | jq -r '.[] | .tags[]'
    ```

3. Start the service with the following command:
    ```bash
    gcloud run services replace --region=europe-west1 cms-service.yaml
    ```
    and then open the URL printed in the console (it will be not available publicly yet).

4. To make your environment publicly available, run the following command:
    ```bash
    gcloud run services add-iam-policy-binding websight-cms \
        --member="allUsers" \
        --role="roles/run.invoker" \
        --region=europe-west1
    ```
5. Refresh the page and login with username `wsadmin` and password `wsadmin`.

## _[Optional]_ Customize CMS admin password
By default, CMS starts with the `wsadmin` user with the `wsadmin` password. To change the password, follow the steps below:

1. Create a secret with the password in Google Secrets Manager:
    ```bash
    mkdir -p .secrets && echo -n "$(openssl rand -base64 12)" > .secrets/admin-password
    gcloud secrets create websight-admin-password --data-file=.secrets/admin-password
    ```
2. Configure Cloud Run to access `websight-admin-password` secret following the [instructions](https://cloud.google.com/run/docs/configuring/services/secrets#access-secret).
    Use the following email in the `New principal` textbox:
    ```bash
    gcloud iam service-accounts list --format json | jq -r '.[] | select(.displayName | contains("Compute")) | .email'
    ```
3. Add the following sections to the `cms-service.yaml` file:
    - a new `volumeMounts` entry under the `containers` CMS entry section:
    ```yaml
    # ...
            volumeMounts:
            - mountPath: /run/secrets
              name: websight-admin-password-volume
              readOnly: true
    # ...
    ```
    - a new `volumes` entry:
    ```yaml
    # ...
          volumes:
          - name: websight-admin-password-volume
            secret:
              items:
              - key: latest
                path: admin.password
              secretName: websight-admin-password
    # ...
    ```
    As a reference you may check our `starter` repository [ephemeral environment manifest](https://github.com/websight-io/starter/blob/main/environment/remote-gcp-cloudrun/service.tmpl.yaml).
4. Save the changes and run the following command to redeploy the CMS (note that all your content changes will be lost):
    ```bash
    gcloud run services replace --region=europe-west1 cms-service.yaml
    ```
5. Login to the CMS with the new password from the secret (`.secrets/admin-password` file).


## Clean up

To delete the environment and the secret, run the following commands:

```bash
gcloud run services delete websight-cms --region=europe-west1
gcloud secrets delete websight-admin-password
```
