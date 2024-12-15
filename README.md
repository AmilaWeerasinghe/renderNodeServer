**Version**: `1.0.0`

**Description**: This project is a Node.js backend application that provides an API for managing skills.
Additionally, it features WebSocket support for real-time visitor tracking.
It includes both unit tests and integration tests to ensure the functionality of the application. 


### Project Structure

```
project-root/
├── controllers/
│   ├── getAllSkills.js
│   ├── getAllSkills.spec.js
│   └── ...
├── database/
│   ├── connection.js    
│   └── ...
├── models/
│   ├── Skill.js
│   └── ...
├── routes/
│   ├── skills.js
│   └── ...
├── test/
│   ├── skills.test.js
│   └── ...
├── websocket/
│   ├── setupWebSocket.js  # WebSocket server setup
│   └── ...
├── server.js
├── package.json
└── README.md

```

- **controllers/**: Contains the controller functions for handling API requests.
- **models/**: Contains the Mongoose models for interacting with the MongoDB database.
- **routes/**: Contains the route definitions for the API endpoints.
- **test/**: Contains the test files for unit tests (`*.spec.js`) and integration tests (`*.test.js`).
- **database/**: Contains database connection handling
- **Websocket/**: Contains websocket handler 
- **server.js**: The main entry point of the application.
- **package.json**: Contains the project dependencies and scripts.
- **README.md**: Documentation for the project.

### Commands

#### Install Dependencies

Before running the tests, make sure to install the project dependencies:

```sh
npm install
```

#### Run All Tests

To run all tests (both unit and integration tests):

```sh
npm test
```

#### Run Unit Tests

To run only the unit tests:

```sh
npm run test:unit
```

#### Run Integration Tests

To run only the integration tests:

```sh
npm run test:integration
```

#### Start Development Server

To start the development server with nodemon:

```sh
npm run dev
```