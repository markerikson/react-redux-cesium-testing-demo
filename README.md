# React-Redux-Cesium-Testing Demo


This sample project demonstrates demonstrates several things:

* Application code using React and Redux, with bare-basic usage of loading images and CSS
* Use of the Cesium 3D globe library, inside a React component, installed using NPM, and with the Cesium pre-built assets served directly from `/node_modules/cesium/` instead of requiring a copy step during development
* Webpack configuration using a "base" set of config options, and multiple extensions of that for development, production, offline test execution, and live test execution in a browser
* Test configuration using Mocha+JSDOM+Chai+Sinon+Enzyme, allowing execution of React component unit tests in a Node environment without the need for Karma or a browser
* Basic ESLint configuration for style checking
* Use of the [shrinkpack](https://github.com/JamieMason/shrinkpack) tool for committing dependencies with minimal overhead, thus allowing dependable and repeatable installations while minimizing the risk of being affected by problems like NPM-Left-Pad-Gate
* Creation of a React component that is loaded asynchronously and rendered when it becomes available


Note that this codebase started as a prototype / research project, and any actual code in here is probably pretty ugly and not well documented.  The intent is to demonstrate a mostly-working project configuration that implements some specific capabilities, and might serve as a useful example for others interested in the same approaches.  You probably don't want to use this as the basis for an actual production application :)


## Getting started

Clone this repo, and run `npm install`.  All the dependencies should be installed directly from the `/node_shrinkwrap/` folder, rather than having to go out to the NPM servers.

### Development commands

These commands are NPM scripts defined in the "scripts" section of [package.json](package.json)

- `npm run dev`: starts the local app development-mode server, at http://localhost:3000
- `npm start`: same as `npm run dev`
- `npm run build`: does a production compile of the source, and writes it to `/dist`
- `npm test`: does a compile of the test dependencies, writes to `/disttest`, and executes the test suite
- `npm run lint`: executes ESLint to flag code style problems
- `npm run test:build`: does the test compilation step
- `npm run test:run`: uses the Mocha test runner to execute an already-built test suite
- `npm run test:dev`: starts the local test-running development-mode server, at http://localhost:3001


### Managing Dependencies using Shrinkpack

The recent uproar over the unpublishing of "left-pad" and the subsequent breakage of thousands of NPM packages and build environments demonstrates the need to maintain a fixed list of _all_ transitive dependencies.  However, the common suggestion of checking in `/node_modules/` is a bad idea.  A typical `/node_modules/` folder is easily 20K files and 150MB, and probably has platform-specific post-installation build artifacts (such as node-sass's native-code SASS compiler).

While researching this issue in 2015, I ran across a tool called https://github.com/JamieMason/shrinkpack , which seems to solve most of this issue.  It simply refers to a npm-shrinkwrap.json file, and uses NPM's caching abilities to grab the tarballs for each exact dependency.  It copies those to a `/node_shrinkwrap/` folder, which can then be easily committed.  That folder will probably be more like 500-750 files and 20MB - much more manageable.  Re-running shrinkpack after a package update will just add or remove a few tarballs as needed, rather than having to re-commit hundreds or thousands of files under `/node_modules/`.  In addition, having the pre-install packages available means that the project can have `npm install` run on multiple platforms, without worrying that a Linux build artifact got checked out on Windows.  There's also no need for NPM to go out to a server during an install, as all dependencies are right here and pre-specified.  That means a build environment doesn't have to have a network connection.

A typical Shrinkpack workflow for managing dependencies looks like this:

```bash
# one-time global install of shrinkpack
npm install -g shrinkpack

# install whatever packages you want to update
npm install some-package --dev

# once you are ready to persist the upgrade, then re-generate 
# npm-shrinkwrap.json, including devDependencies
npm shrinkwrap --dev  

# re-run shrinkpack to rewrite the shrinkwrap links to 
# point to ./node_shrinkwrap/some-tarball.tgz
shrinkpack

# add new package files to version control
git add npm-shrinkwrap.json
git add node_shrinkwrap
git commit -m "Updated some-package"
```




### Repo Layout

- $REPO
  - **dist:** output folder for the production build
  - **disttest**: output folder for the test build
  - **node_modules**: local installations of JS build and app dependencies (NOT checked in)
  - **node_shrinkwrap**: downloaded zip files needed to install those dependencies (checked in)
  - **src**: application source
    - **actions**: Redux action creator functions ("fetch data", "update check state", "increment counter", etc)
    - **assets**: temporary folder holding a 3rd-party stylesheet
    - **components**: UI view classes
    - **constants**: exported constants referenced by actions and reducers
    - **containers**: another UI view classes folder - will probably be removed / merged
    - **layouts**: more UI view classes that are solely responsible for laying out structure on screen
    - **reducers**: Redux reducer functions that update state based on dispatched actions
    - **selectors**: reusable functions for extracting pieces of data from the Redux store
    - **store**: logic for initializing the Redux store on startup
    - **styles**: CSS and images
    - **utils**: utility functions
    - *index.js*: the client-side entry point
    - *index.template.html*: template for a generated HTML host page
  - **test**: test setup and test files
    - *testEntry.js*: used to recursively load all test files in the folder
    - *mocha.opts*: Mocha config options used when running in the CLI
    - *mocha_helper.js*: environment setup logic for Mocha in the CLI
    - *testSetup.js*: imports used when running Mocha in the browser
  - **webpack**: configuration options for Webpack, used for building Javascript bundles
    - *copyCesium.js*: a utility to copy portions of Cesium from `/node_modules/` to the build output folder
    - *webpack.base.config.js*: common Webpack settings used by the different config variants
    - *webpack.dev.config.js*: Webpack settings for the development mode server
    - *webpack.prod.config.js*: Webpack settings for the production build
    - *webpack.test.config.js*: Webpack settings for the offline test build
    - *webpack.testdev.config.js*: Webpack settings for the Mocha development mode server
  - *.babelrc*: common config options for the Babel JS transpiler
  - *.eslintrc*: settings for the ESLint code style checker
  - *config.js*: common internal environment variables and app settings
  - *devServer.js*: the application development mode server
  - *npm-shrinkwrap.json*: the generated file listing all transitive app and build dependencies
  - *package.json*: the NPM project definition file, including top-level dependencies, `npm run` scripts, and project metadata
  - *testServer.js*: the Mocha test development mode server