import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  CLIENT_SECRET: get('CLIENT_SECRET').required().asString(),
  CLIENT_ID: get('CLIENT_ID').required().asString(),
};
