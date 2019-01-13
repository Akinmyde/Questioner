import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_MIGRATION,
};

const env = process.env.NODE_ENV || 'development';

const connectionString = config[env];

const pool = new Pool({ connectionString });

export default pool;
