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

1. See the available `websight-cms-starter` image tags with the following command:
    ```bash
    gcloud artifacts docker tags list \
      europe-docker.pkg.dev/websight-io/public/websight-cms-starter --format="table(tag)"
    ```
2. Use one of the tags to deploy the CMS to Cloud Run by replacing `<IMAGE_TAG>` and simply run:
    ```bash
    gcloud run deploy websight-cms-starter \
      --image=europe-docker.pkg.dev/websight-io/public/websight-cms-starter:<IMAGE_TAG> \
      --cpu=2 --memory=2Gi --no-cpu-throttling \
      --min-instances=1 --max-instances=1 --region=europe-west1 \
      --args=websight-cms-starter-tar
    ```
    Follow the instructions on the screen.
      - Reply with `y` when asked whether to allow unauthenticated invocations to make your CMS instance publicly available.
3. The successfull deployment will finish with a message similar to the following:

    ```
    Service [websight-cms-starter] revision [websight-cms-starter-00001-rlm] has been 
    deployed and is serving 100 percent of traffic. 
    Service URL: https://websight-cms-starter-tkcqcyf6ca-ew.a.run.app
    ```
    
    CMS might need additional 20 seconds to start after the message above. Open the url and login with username `wsadmin` and password `wsadmin`.

## _[Optional]_ Customize CMS admin password
By default, CMS starts with the `wsadmin` user with the `wsadmin` password. To change the password, follow the steps below:

1. Create a secret with the password in Google Secrets Manager following [this instruction](https://cloud.google.com/secret-manager/docs/creating-and-accessing-secrets).
    - use `websight-admin-password` as the secret name
2. Configure Cloud Run to access `websight-admin-password` secret following the [instructions](https://cloud.google.com/run/docs/configuring/services/secrets#access-secret).
    Use the default Compute Engine service account email in the `New principal` textbox:
    ```bash
    gcloud iam service-accounts list --format="table(email)" \
      --filter="displayName:Compute Engine"
    ```
3. Update the CMS service by running (note that **all your content changes will be lost**):
    ```bash
    gcloud run deploy websight-cms-starter \
      --update-secrets=/run/secrets/admin.password=websight-admin-password:1 \
      --image=europe-docker.pkg.dev/websight-io/public/websight-cms-starter:<IMAGE_TAG> \
      --cpu=2 --memory=2Gi --no-cpu-throttling \
      --min-instances=1 --max-instances=1 --region=europe-west1 \
      --args=websight-cms-starter-tar
    ```
4. Login to the CMS with the new password from the secret.

## Clean up

To delete the environment and the secret, run the following commands:

```bash
gcloud run services delete websight-cms-starter --region=europe-west1
gcloud secrets delete websight-admin-password
```
