# Deployment to Google Cloud Run

Cloud Run is a serverless platform that allows you to run `stateless` HTTP containers on a fully managed environment. WebSight CMS with its stateful nature is not a perfect fit for Cloud Run, but it's still possible to run it there for development purposes. However, here are some limitations to keep in mind:

- Lost data on restart: Cloud Run is a stateless platform, which means that any data stored in memory will be lost when the container is restarted. **This means that you will lose all your data when you restart the container (e.g. when you deploy new version of the container)**. This is not a problem for development purposes, but it's not recommended to use Cloud Run for production deployments.

!!! Warning "Notice"
    This guide enables running development purposes CMS instance. For a production environment we recommend using [Kubernetes](../kubernetes/) deployment with MongoDB Node Store backend.

!!! abstract "Before you start"
    Make sure you have:

       - your [GCP environment set](https://cloud.google.com/run/docs/setup)
       - Cloud Run API [enabled](https://cloud.google.com/apis/docs/getting-started#enabling_apis)

## Run CMS in Cloud Run
Choose one of the following options to run the CMS instance on Cloud Run.

### Sample `starter` CMS instance
With this variant you will deploy a sample CMS instance to Cloud Run using the publicly available `websight-cms-starter` image of a [sample WebSight CMS project](https://github.com/websight-io/starter).

1. See the available `websight-cms-starter` image tags with the following command:
    ```bash
    gcloud artifacts docker tags list \
      europe-docker.pkg.dev/websight-io/public/websight-cms-starter --format="table(tag)"
    ```
2. Use the most recent tag to deploy the CMS to Cloud Run by replacing `<IMAGE_TAG>` and simply run:
    ```bash
    gcloud run deploy my-websight-cms \
      --image=europe-docker.pkg.dev/websight-io/public/websight-cms-starter:<IMAGE_TAG> \
      --cpu=2 --memory=2Gi --no-cpu-throttling \
      --min-instances=1 --max-instances=1 --region=europe-west1 \
      --allow-unauthenticated
    ```
    Follow the instructions on the screen.
      - Reply with `y` if asked whether to allow unauthenticated invocations to make your CMS instance publicly available.
3. The successfull deployment will finish with a message similar to the following:

    ```
    Service [my-websight-cms] revision [my-websight-cms-00001-rlm] has been 
    deployed and is serving 100 percent of traffic. 
    Service URL: https://my-websight-cms-tkcqcyf6ca-ew.a.run.app
    ```
    
    CMS might need additional 20 seconds to start after the message above. Open the url and login with username `wsadmin` and password `wsadmin`.

### Customized CMS instance
In this variant you will deploy your customized WebSight CMS instance to Cloud Run. Start with cloning the [websight-cms-starter](https://github.com/websight-io/starter).
Feel free to modify any part of the CMS. You may follow the [quick-start](/cms/developers/quick-start/) guide to learn how to customize the CMS. 
When you have your changes ready and working locally, follow the steps below to deploy the CMS to Cloud Run.

1. In the root of cloned repository run the following command to build the CMS image in Cloud Build and run the instance in Cloud Run:
    ```bash
    gcloud run deploy my-websight-cms --source=. \
      --cpu=2 --memory=2Gi --no-cpu-throttling \
      --min-instances=1 --max-instances=1 \
      --allow-unauthenticated --region=europe-west1
    ```
    Follow the instructions on the screen. Enable creating Google Artifact Registry if asked (it is required to store the image built in Cloud Build).
2. The build can take up to a couple of minutes. The successfull deployment will finish with a message similar to the following:

    ```
    Service [my-websight-cms] revision [my-websight-cms-00001-6dg] has been 
    deployed and is serving 100 percent of traffic.
    Service URL: https://my-websight-cms-tkcqcyf6ca-ew.a.run.app
    ```
    
    CMS might need additional 20 seconds to start after the message above. Open the url and login with username `wsadmin` and password `wsadmin`.
    
## Customize CMS admin password
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
    gcloud run services update my-websight-cms \
      --update-secrets=/run/secrets/admin.password=websight-admin-password:1 \
      --region=europe-west1
    ```
4. Login to the CMS with the new password from the secret.

## Clean up

To delete the environment, the secret, and the custom image from registry, run the following commands:

```bash
gcloud run services delete my-websight-cms --region=europe-west1
gcloud secrets delete websight-admin-password
gcloud artifacts docker images delete \
  europe-west1-docker.pkg.dev/<GCP_PROJECT_ID>/cloud-run-source-deploy/my-websight-cms
```
