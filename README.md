# Backend-template

### What is this repository for?

- This repo is for the backend template using es6 and advance feature using major and minor things
- It consists of the MongoDb connection with the app using the docker setup

### How do I get set up?

- Summary of set up

  - [x] pre requirement

    - [x] node for the run time env
    - [x] npm for the package and dependencies installation
    - [x] docker set up running with the desired setting for the system

    ```
    node -v;
    // v16.17.1
    npm -v;
    // 8.15.0
    yarn --version
    // 1.22.19
    docker -v;
    // Docker version 20.10.18, build b40c2f6
    ```

- Configuration

  ```js

  npm install  / yarn
  // will add the necessary packages that are required for the template to run

  npm run db:init /  yarn db:init
  // will start the db compose and add the database for mongodb

  npm dev /  yarn dev
  // to start the app in the dev env

  ```

- Config Folder

  - [x] Create the default.json file from the default.example.json
  - [x] else create the .env file with the desired details for the src/appConfig.js

- Database configuration
- How to run tests
- Deployment instructions

### Contribution guidelines

- Writing tests
- Code review
- Other guidelines

### Who do I talk to?

- Repo owner or admin
- Other community or team contact
