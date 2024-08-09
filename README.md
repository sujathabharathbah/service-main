# taa-service - Integrated Collaboration Adaptor prototype wrapper backend API micro-service

## Table of Contents

-   [Description](#description)
-   [Technical Resources](#technical-resources)
-   [Manual Installation](#manual-installation)
-   [Prior to pushing code to Git Note](#prior-to-pushing-code-to-git-note)
-   [Configuration](#configuration)
-   [Local Testing](#local-testing)
-   [GitHub Actions Workflow](#github-actions-workflow)
-   [Project Structure](#project-structure)
-   [API Documentation](#api-documentation)

## Description

This application serves as a wrapper for API requests, providing authentication, call management, room creation, and other functionalities for a Communication as a Service (CaaS) platform.

## Technical Resources

To better understand the technical aspects of this project, please review the following resources:

1. Express.js

    - [Official Documentation](https://expressjs.com/)
    - [Routing Guide](https://expressjs.com/en/guide/routing.html)

2. Node.js

    - [Official Documentation](https://nodejs.org/en/docs/)
    - [Working with Environment Variables](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs)

3. Axios

    - [GitHub Repository](https://github.com/axios/axios)
    - [Documentation](https://axios-http.com/docs/intro)

4. Error Handling in Express

    - [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)

5. Azure Communication Email Services
    - [Official Documentation](https://docs.microsoft.com/en-us/azure/communication-services/quickstarts/email/send-email?pivots=programming-language-javascript)

## Manual Installation

#### Clone the repo:

```bash
git clone https://github.com/TAA-Work/taa-service
cd taa-service
```

#### Install the dependencies:

```bash
npm install
```

Start local server after running eslint and validating formatting across the code:

```bash
npm run start-server
```

Run server locally without the eslint and prettier formatting checks:

```bash
npm run start
```

#### Prior to pushing code to Git Note

Recommended during development: Run locally after validating for JS best practices, errors using eslint and validating formatting across the code:

```bash
npm run start
```

Validate eslint issues:

```bash
npm run lint:check
```

Fix eslint issues:

```bash
npm run lint:fix
```

Validate formatting issues:

```bash
npm run format:check
```

Fix formatting issues:

```bash
npm run format:fix
```

## Configuration

### Constants

This project uses a `constants.js` file to manage various API endpoints and configuration values. The file is located in the `config` directory.

Key constants include:

1. `AUTH_ENDPOINT` #Endpoint for ACS token retrieval
2. `ACS_TOKEN_API_ENDPOINT` #Endpoint for ACS call management
3. `ACS_CALL_API_ENDPOINT` #Endpoint for WebEx call management
4. `ROOM_ENDPOINT` #Endpoint for ACS room creation

### Environment Variables

The application uses environment variables for configuration. These are set in a `.env.localhost` file for local development.
For the deployed environments, the environment variables are set in the Application Settings of the WebApp configuration.

For local development, create a `.env.localhost` file in the project root with these variables.
This file is added to .gitignore to avoid being committed to version control.

#### Required environment variables:

1. `INTERFACE_API_URL` #Interface API Endpoint URL
2. `RESOURCE_GROUP` #Resource Group name
3. `KEY_VAULT_NAME` #Azure KeyVault name
4. `KEYVAULT_SUBSCRIPTION_ID` #Azure Subscription ID
5. `ACS-API-ENDPOINT` #Azure ACS Endpoint
6. `ACS-ACCESSKEY` #Azure ACS Access Key
7. `ACS-EMAIL-API-ENDPOINT` #Azure ACS Email Endpoint

## Local Testing

For local testing:

1. Ensure your `.env.localhost` file is properly configured.
2. Run the local server:
    ```
    npm run start-server
    ```
3. The server will use the constants defined in `config/constants.js` for endpoints.

### Important Note

1. Local changes might crash the server if there are linting or formatting issues.
2. Ensure code is free from lint and format issues before pushing. Build will fail otherwise.

## GitHub Actions Workflow

Our project uses GitHub Actions for continuous integration and deployment. Here are some key points about our workflow file:

### Environment Determination

The workflow determines the deployment environment based on the branch name. This is crucial for setting environment-specific variables:

```yaml
- name: Determine environment
  id: determine_env
  run: |
      if [[ "${{ github.ref }}" == "refs/heads/main" ]]; then
        echo "env=production" >> $GITHUB_OUTPUT
      elif [[ "${{ github.ref }}" == "refs/heads/staging" ]]; then
        echo "env=staging" >> $GITHUB_OUTPUT
      elif [[ "${{ github.ref }}" == "refs/heads/develop" ]]; then
        echo "env=development" >> $GITHUB_OUTPUT
      else
        echo "env=feature" >> $GITHUB_OUTPUT
      fi
```

Ensure this logic is updated if new branches or environments are added.

### Azure Deployment

The workflow uses Azure login and web app deployment actions. Keep the following secrets up to date in your GitHub repository:

-   `AZUREAPPSERVICE_CLIENTID_*`
-   `AZUREAPPSERVICE_TENANTID_*`
-   `AZUREAPPSERVICE_SUBSCRIPTIONID_*`

### Environment Variables

The workflow sets environment variables both for the build process and in the Azure Web App settings:

```yaml
- name: 'Set App Settings'
  uses: azure/appservice-settings@v1
  with:
      app-name: 'webapp-caa-service-api-feature'
      app-settings-json: |
          [
            {
              "name": "NODE_ENV",
              "value": "${{ needs.build.outputs.env }}"
            },
            {
              "name": "RESOURCE_GROUP",
              "value": "${{ needs.build.outputs.resource_group }}"
            },
            {
              "name": "KEY_VAULT_NAME",
              "value": "${{ needs.build.outputs.key_vault_name }}"
            },
            {
              "name": "KEYVAULT_SUBSCRIPTION_ID",
              "value": "${{ secrets.AZUREAPPSERVICE_SUBSCRIPTIONID_EDF74A8FCB2742E78EF7BB1A7E5D11B4 }}"
            }
          ]
```

Ensure that any new environment variables needed by the application are added here.

### Workflow Triggers

Currently, the workflow is triggered on pushes to the specific branch mentioned and manual dispatch. Update the trigger configuration as needed:

```yaml
on:
    push:
        branches:
            - bugfix/CAA-163
    workflow_dispatch:
```

Remember to keep this README section updated whenever you make changes to the GitHub Actions workflow file. This ensures that all team members are aware of the current CI/CD process and can contribute effectively to the project.

## Project Structure

```

|--app.js # Entry point
|--.github\ # Github workflow action files
|--config\ # Configuration folder
|--controllers\ # Controllers - Business logic
|--routes\ # Routes
|--utils\ # Utility classes and functions

```

### API Documentation

**Authentication routes**:\
`POST /auth` - Authorize user\
`POST /auth/acsToken`: Get ACS token\
`GET /auth/session/:sessionId` - Get session information\
`POST /auth/logout` - Logout user

**Call routes**:\
`POST /call` - Make a call\
`GET /call/:callId` - Get call data\
`POST /call/end-call/:callId` - End a call

**Backends routes**:\
`GET /` - Get all backends

**Capabilities routes**:\
`GET /:backendId` - Get all capabilities for a specific backend

**Room routes**:\
`POST /room/createRoom` - Create a new room

**Email routes**:\
`POST /sendEmail` - Sends Email when given sender/recipient email addressess and meeting link\

#### API Example

```http
{
  "senderAddress": "DoNotReply@38c702f1-b6d4-4efd-9043-8009b526cf46.azurecomm.net",
  "recipientAddress": "arshad_saad@bah.com",
  "meetingLink": "www.google.com"
}
```

**Note on Email Sender Address**:\
@38c702f1-b6d4-4efd-9043-8009b526cf46.azurecomm.net
This is the Default domain as of now the ECS resource.

For future consideration, va.gov domain needs to be added to the ECS > Settings > Provision Domains and linked with the ACS resource under ACS > Email > Domains

## License

```
[VA](Integrated Collaboration Adaptor)
```
