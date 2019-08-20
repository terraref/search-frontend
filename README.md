# TERRA-REF Advanced Search

## Project setup
On a Mac, must be running Node and NPM:
https://medium.com/@kkostov/how-to-install-node-and-npm-on-macos-using-homebrew-708e2c3877bd

On a Windows system, must install the Linux Subsytem first:
https://medium.com/@edwardbaeg9/using-homebrew-on-windows-10-with-windows-subsystem-for-linux-wsl-c7f1792f88b3

Once the development Node/NPM environment is setup, install `yarn` globally:
`brew install yarn`

```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Contributions
Create a new branch off of `master`, makes any changes/commits and push new branch to origin. Create a pull request via GitHub for peer review to be merged into `staging` to be testing on the dev server.

## Deployment
This project it using GitHub WebHook and AWS CodePipelines for continous integration. Any commits made to the `staging` branch will automatically deploy to `dev.search.terraref.org`, and any commits made to the `master` branch will automatically deploy to `search.terraref.org`. 