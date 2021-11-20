# secure'nt - WebApp

This repo holds the code of our Web app. It is deployed using CodeBuild. The images in the carousel are automatically watermarked using our in-house watermarking service.

## Running the application locally

### Install

```bash
# Install the dependencies
$ cd client
$ npm install
```

### Run

```bash
# Set the required environment variables

$ export VUE_APP_USER_POOL_DOMAIN=...
$ export VUE_APP_USER_POOL_CLIENT_ID=...
$ export VUE_APP_USER_POOL_REGION=...
$ export VUE_APP_COGNITO_IDENTITY_POOL_ID=...
$ export VUE_APP_DOMAIN_NAME=...

# Run the app
$ cd client
$ npm run serve
```

## Todos

- Find a way to not hardcode secrets in the watermarking Lambda
