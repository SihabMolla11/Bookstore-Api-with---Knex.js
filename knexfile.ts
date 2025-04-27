import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const config = {
  development: {
    client: process.env.DB_CLIENT ?? 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations'),
    },
    // seeds: {
    //   directory: path.join(__dirname, 'src/db/seeds'),
    // },
  },
  production: {
    client: process.env.DB_CLIENT,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations'),
    },
    // seeds: {
    //   directory: path.join(__dirname, 'src/db/seeds'),
    // },
  },
};

export default config;
