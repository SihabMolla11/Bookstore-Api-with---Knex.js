# Bookstore API

A RESTful API for managing a bookstore, built with TypeScript, Express, and Knex.

## Live API

Base URL: `https://bookstore-api-with-knex-js.onrender.com`

API Routes: `/api/v1`

Example endpoint: `https://bookstore-api-with-knex-js.onrender.com/api/v1/books`


## Technologies Used

- Node.js - JavaScript runtime
- Express.js - Backend framework
- TypeScript - Type-safe JavaScript
- Joi - Input validation
- JWT (jsonwebtoken) - Authentication
- Knex.js - SQL query builder
- pg - PostgreSQL database client


## Features

- Complete CRUD operations for authors and books
- Input validation with (joi) Validator
- Use Knex.js: SQL Query Builder
- Use PostgreSQL For database management
- Error handling with meaningful responses

## Prerequisites

- Node.js
- PostgreSQL
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
https://github.com/SihabMolla11/Bookstore-Api-with---Knex.js.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Configure the following variables in your `.env` file:

```
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_CLIENT=
```

### Migration Commands

Run migrations to set up your database schema:

```bash
npm run migrate:latest
```

Create a new migration file:

```bash
npm run migrate:make <migration_name>
```

Rollback the most recent migration:

```bash
npm run migrate:rollback
```

Reset all migrations (rollback everything):

```bash
npm run migrate:reset
```

Load sample data from `bookstore-test-data.sql` file - (optional)

### 5. Start the server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

## API Documentation

### Import Postman Collection

Import the provided Postman collection for easy API testing:

1. Open Postman
2. Click on "Import"
3. Select the file or drag and drop the `Book Store API.postman_collection.json` file

## License

Sihab Uddin Molla
