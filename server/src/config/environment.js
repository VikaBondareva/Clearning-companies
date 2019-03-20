const dotenv = require("dotenv");
const joi = require("joi");

const schema = joi
  .object({
    NODE_ENV: joi.string().valid("development", "test", "production"),
    APP_PORT: joi.number().default(3000),

    JWT_ENCRYPTION: joi.string(),
    JWT_ACCESS_EXPIRATION: joi.number(),
    JWT_ACCESS_TYPE: joi.string(),

    JWT_REFRESH_EXPIRATION: joi.string(),
    JWT_REFRESH_TYPE: joi.string(),
    JWT_VERIFIED_EXPIRATION: joi.number(),

    MONGODB_HOST: joi.string(),

    TWILLIO_ACOUNT_SID: joi.string(),
    TWILLIO_AUTH_TOKEN: joi.string(),
    TWILLIO_PHONE_NUMBER: joi.string(),

    GMAIL_USER_NAME: joi.string(),
    GMAIL_USER_PASSWORD: joi.string(),

    GMAIL_SERVER_NAME: joi.string(),
    GMAIL_SERVER_HOST: joi.string(),

    EMAIL_SERVER_PORT: joi.number(),

    GITHUB_CLIENT_ID: joi.string(),
    GITHUB_CLIENT_SECRET: joi.string(),

    GOOGLE_CLIENT_ID: joi.string(),
    GOOGLE_CLIENT_SECRET: joi.string(),

    VKONTAKTE_CLIENT_ID: joi.string(),
    VKONTAKTE_CLIENT_SECRET: joi.string()
  })
  .unknown()
  .required();

dotenv.config();

const { error, value: envVars } = joi.validate(process.env, schema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  app: {
    environment: envVars.NODE_ENV,
    port: envVars.APP_PORT
  },
  jwt: {
    secret: envVars.JWT_ENCRYPTION,
    access: {
      expiration: envVars.JWT_ACCESS_EXPIRATION,
      type: envVars.JWT_ACCESS_TYPE
    },
    refresh: {
      expiration: envVars.JWT_REFRESH_EXPIRATION,
      type: envVars.JWT_REFRESH_TYPE
    },
    verified: {
      expiration: envVars.JWT_VERIFIED_EXPIRATION
    }
  },
  mongodb: {
    host: envVars.MONGODB_HOST
  },
  twillio: {
    accountSID: envVars.TWILLIO_ACOUNT_SID,
    authToken: envVars.TWILLIO_AUTH_TOKEN,
    phoneFrom: envVars.TWILLIO_PHONE_NUMBER
  },
  gmailServer: {
    name: envVars.GMAIL_SERVER_NAME,
    host: envVars.GMAIL_SERVER_HOST
  },
  gmailUser: {
    email: envVars.GMAIL_USER_NAME,
    password: envVars.GMAIL_USER_PASSWORD
  },
  emailPort: envVars.EMAIL_SERVER_PORT,
  github: {
    clientID: envVars.GITHUB_CLIENT_ID,
    clientSecret: envVars.GITHUB_CLIENT_SECRET
  },
  google: {
    clientID: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET
  },
  vkontakte: {
    clientID: envVars.VKONTAKTE_CLIENT_ID,
    clientSecret: envVars.VKONTAKTE_CLIENT_SECRET
  }
};
