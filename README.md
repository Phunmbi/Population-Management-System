[![CircleCI](https://circleci.com/gh/Phunmbi/Population-Management-System.svg?style=svg)](https://circleci.com/gh/Phunmbi/Population-Management-System) [![Maintainability](https://api.codeclimate.com/v1/badges/033d4f56398d3e18301c/maintainability)](https://codeclimate.com/github/Phunmbi/Population-Management-System/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/033d4f56398d3e18301c/test_coverage)](https://codeclimate.com/github/Phunmbi/Population-Management-System/test_coverage)

# Population-Management-System
Basic Population Management System REST API application built with NodeJS and ExpressJS

### Documentation
Refer here to access this API's Documentation [https://documenter.getpostman.com/view/3994951/SVYkx253](https://documenter.getpostman.com/view/3994951/SVYkx253)

### Deployment
API is deployed at [https://population-management-sys-lms.herokuapp.com/](https://population-management-sys-lms.herokuapp.com/)

## Table of Contents
* [Technologies](#technologies)
* [Features Implemented](#features-implemented)
* [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Development](#development)
  * [Testing](#testing)
* [License](#license)
### Pivotal Tracker
Project is currently being built with the Project Management Tool, Pivotal Tracker.
You can find the project at [https://www.pivotaltracker.com/n/projects/2379134](https://www.pivotaltracker.com/n/projects/2379134)
## Technologies
* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework
### Supporting Packages
#### Linter
* [ESLint](https://eslint.org/) - Linter Tool
#### Compiler
* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript
#### Test Tools
* [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests (Backend)
* [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
* [Supertest](https://www.npmjs.com/package/supertest) - A superagent implementation for http tests
* [Istanbul(nyc)](https://istanbul.js.org/) - Code Coverage Generator
* [Yarn](https://yarnpkg.org/) - Package managemnet
## Features Implemented
### Users
* Users are able to create population information for a location by gender
* Users are able to modify population information for a location by gender
* Users are able to retrieve population information for all locations by gender
* Users are able to retrieve population information for a location by gender
* Users are able to delete population information for a location by gender
* Users are able to create population information for a sub-location by gender
* Users are able to modify population information for a sub-location by gender
* Users are able to retrieve population information for a sub-location by gender
* Users are able to delete population information for a sub-location by gender
## Getting Started
### Installation
* Install [NodeJS](https://nodejs.org/), [PostgreSQL](https://www.postgresql.org/), and [Yarn](https://www.yarnpkg.org/) on your computer
* Clone this repository using `git clone https://github.com/Phunmbi/sms-management-API`
* Create a new database
* Use the `.env.example` file to setup your environmental variables and rename the file to `.env`
* Run `yarn install` to install all dependencies
* Run `yarn db:prepare` to prepare your database
* Run `yarn build` to build the project
* Run `yarn start` to start the server
* Interact with [localhost:[PORT]](http://localhost:[PORT]/) in POSTMAN to access the application
### Development
You can run `yarn dev` in development to use [Nodemon](https://nodemon.io/).
[Nodemon](https://nodemon.io/) watches for file changes and restarts your server.
### Testing
#### Prerequisites
* [Postman](https://getpostman.com/) - API Toolchain
#### Testing with Postman
* After installing as shown above
* Navigate to [localhost:[PORT]](http://localhost:[PORT]/) in [Postman](https://getpostman.com/) to access the application
#### Testing with Coverage Data
* After installing as shown
## Using the Live App
The live application is hosted at [https://population-management-sys-lms.herokuapp.com/](https://population-management-sys-lms.herokuapp.com/)
## License
&copy; Funmbi Adeyokunnu
Licensed under the [MIT License](https://github.com/Phunmbi/Population-Management-System/blob/master/LICENSE)
