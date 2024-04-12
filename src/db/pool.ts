import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); 

const pool = new Pool({
  host: process.env.AWS_RDS_POSTGRESQL_HOST, 
  port: 5432,
  database: process.env.AWS_RDS_POSTGRESQL_DB_NAME,
  user: process.env.AWS_RDS_POSTGRESQL_USERNAME,
  password: process.env.AWS_RDS_POSTGRESQL_PASSWORD
});

export default pool;
