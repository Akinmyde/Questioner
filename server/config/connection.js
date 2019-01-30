import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: process.env.DATABASE_DEVELOPMENT,
  test: process.env.DATABASE_TEST,
  production: process.env.DATABASE_URL
};

const env = process.env.NODE_ENV || 'development';

const connectionString = config[env];

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 2000,
  max: 5,
  min: 4,
});

export default pool;
