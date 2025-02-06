import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  baseUrl: process.env.DATABASE_URL,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  NODE_ENV: process.env.NODE_ENV,
  JWT_ACCESS_TOKEN_EXPIRE_IN_ACCESSION:
    process.env.JWT_ACCESS_TOKEN_EXPIRE_IN_ACCESSION,
};
