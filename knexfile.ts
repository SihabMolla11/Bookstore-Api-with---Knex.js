import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const db_client = process.env.DB_CLIENT;

const is_ssl_host = process.env.IS_SSL_HOST === 'true';

const DATABASE_URL = `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`;

const config = {
  development: {
    client: db_client,
    connection: {
      connectionString: DATABASE_URL,
      ssl: is_ssl_host ? { rejectUnauthorized: true } : false,
    },
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations'),
    },
  },
  production: {
    client: db_client,
    connection: {
      connectionString: DATABASE_URL,
      ssl: is_ssl_host ? { rejectUnauthorized: true } : false,
    },
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations'),
    },
  },
};

console.log('db ====>', 'successfully connected' );

export default config;
