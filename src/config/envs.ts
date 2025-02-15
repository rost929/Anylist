import 'dotenv/config';
import * as joi from 'joi';

interface envVars {
  DB_HOST: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_USERNAME: string;
  JWT_SECRET: string;
}

const envsSchema = joi
  .object({
    DB_USERNAME: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_PORT: joi.string().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value: envVars } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error ${error.message}`);
}

export const envs = {
  dbHost: envVars.DB_HOST,
  dbUsername: envVars.DB_USERNAME,
  dbPassword: envVars.DB_PASSWORD,
  dbName: envVars.DB_NAME,
  dbPort: envVars.DB_PORT,
  jwtSecret: envVars.JWT_SECRET,
};
