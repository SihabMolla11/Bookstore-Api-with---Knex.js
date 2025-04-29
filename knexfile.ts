import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const DB_CLIENT = process.env.DB_CLIENT;

const DATABASE_URL = `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`;

const config = {
  development: {
    client: DB_CLIENT,
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations'),
    },
  },
  production: {
    client: DB_CLIENT,
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations'),
    },
  },
};

console.log('db', DATABASE_URL);

export default config;
