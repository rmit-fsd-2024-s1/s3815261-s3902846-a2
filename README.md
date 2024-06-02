# Project Setup

## GitHub Repository

Check out the project on GitHub: [GitHub Link](https://github.com/rmit-fsd-2024-s1/s3815261-s3902846-a2)

## Authors

- **Margaret Xiao**
- **Owen Griffiths**

This project contains two main components: a Node.js server using Express and Sequelize (`express-with-sequelize`), and a Vite-powered React application with TypeScript and Tailwind CSS (`react-app`).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Backend (Express with Sequelize)](#backend-express-with-sequelize)
  - [Frontend (React with Vite)](#frontend-react-with-vite)
- [Running the Project](#running-the-project)
- [Running Tests](#running-tests)
- [Additional Information](#additional-information)
- [License](#license)

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/)

## Setup

### Backend (Express with Sequelize)

1. **Navigate to the backend directory**:

   ```bash
   cd express-with-sequelize
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Start the backend server**:
   ```bash
   npm start
   ```

### Frontend (React with Vite)

1. **Navigate to the frontend directory**:

   ```bash
   cd ../react-app
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Start the frontend development server**:
   ```bash
   npm run dev
   ```

## Running the Project

To run the entire project, follow these steps:

1. **Start the backend server first**:

   ```bash
   cd express-with-sequelize
   npm start
   ```

2. **In a new terminal, start the frontend development server**:
   ```bash
   cd react-app
   npm run dev
   ```

By starting the backend server first, you ensure that the frontend can properly communicate with the backend APIs.

## Running Tests

The frontend (`react-app`) includes tests that can be run using the following command:

1. **Navigate to the frontend directory**:

   ```bash
   cd react-app
   ```

2. **Run the tests**:
   ```bash
   npm test
   ```

This will execute the test suite for the React application.

## Additional Information

- The backend server runs on `http://localhost:5000` by default.
- The frontend development server runs on `http://localhost:5173` by default.
- Ensure that the backend server is running before starting the frontend development server to avoid any connectivity issues.
- Entity Relationship Diagram PDF has been placed in express-with-sequelize folder.
