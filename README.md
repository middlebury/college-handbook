# Middlebury College Handbook

## Requirements

* [Node.js](https://nodejs.org/) ^24.14.1
* [Gatsby CLI](https://www.gatsbyjs.com/docs/tutorial/getting-started/part-0/#gatsby-cli) - Install the Gatsby CLI globally by running the command below:

```shell
npm install -g gatsby-cli
```

## Start developing

Clone the repo and install node dependencies:

```shell
npm install
```

Navigate into the site’s directory and start it up:

```shell
cd college-handbook/
npm start
```

If the project fails to start due to errors run:

```shell
npm run clean
npm start
```

To compile the site for production so it can be deployed:

```shell
npm run build
```

To serve the production build of the site for testing prior to deployment:

```shell
npm run serve
```

## Maintenance

Steps for periodic maintenance:

```shell
# delete previously installed dependencies 
rm -rf node_modules package-lock.json

# install dependencies
npm install

# list dependencies with new major releases
npm outdated
```

As of August 14, 2026, the following dependencies have newer releases that we cannot update to yet:
1. `decap-cms-app` - Versions >3.6.2 are not compatible with React 19.
2. `react` & `react-dom` - React and ReactDOM cannot be upgraded to version 19.2.8 as the latest version of `decap-cms-app` is not compatible.

If other dependencies have new major releases, check the release notes for the dependencies and review breaking changes if any. Install the latest versions of the dependencies and make the necessary updates in code.

If there are no other dependencies with major releases, `npm install` should automatically update minor and patch versions of dependencies in `package-lock.json`. Commit the changes to package-lock.json to the `main` branch. 

## Contributing to the project 

Look at CONTRIBUTING.md for instructions on how to add new pages to the handbook. 

## Project Setup
This project uses [GatsbyJS](https://www.gatsbyjs.com/front-end-framework/) and [Decap CMS](https://decapcms.org/). The built assets are served as an Azure site at [handbook.middlebury.edu](https://handbook.middlebury.edu/). 

The built assets are also served through Netlify at [college-handbook.netlify.app](https://college-handbook.netlify.app), in order to take advantage of Netlify's built-in authentication service called [Identity](https://docs.netlify.com/manage/security/secure-access-to-sites/identity/overview/). It allows for easy management of users for this application.
To manage the college handbook site in Netlify go to app.netlify.com and login using the webaster@middlebury.edu account.

The CMS can be accessed at [college-handbook.netlify.app/admin](https://college-handbook.netlify.app/admin/).

## Build Workflow

```mermaid
flowchart LR
    A@{ shape: sm-circ, label: "Small start" } --> B[Commit to `main` branch] -- Azure flow --> C[Github Action workflow runs 'Build and Deploy Job' as defined in .github/workflows/azure-static-web-apps-happy-bay-0bf76b610.yml] --> E['npm run build' builds files and assets for frontend application and CMS] --> F[Built bundle is deployed to the site at handbook.middlebury.edu];
B -- Netlify flow --> G[Triggers build in Netlify] --> H['npm run build' builds files and assets for frontend application and CMS] --> I[Built bundle is deployed to the site at college-handbook.netlify.app];
```
