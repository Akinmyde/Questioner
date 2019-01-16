import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_MIGRATION,
  production: process.env.DATABASE_PRODUCTION,
};

const env = process.env.NODE_ENV || 'development';

const connectionString = config[env];

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 2000,
  max: 5,
  min: 4,
});

export default pool;
