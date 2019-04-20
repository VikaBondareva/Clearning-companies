const dotenv = require("dotenv");
const joi = require("joi");

const schema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid("development", "test", "production")
      .default("development"),
    APP_PORT: joi.number().default(3050),

    JWT_ENCRYPTION: joi
      .string()
      .default("e5a3388c-9731-my-secret-8b11-be602d8c54845"),
    JWT_ACCESS_EXPIRATION: joi.number().default(28800),
    JWT_ACCESS_TYPE: joi.string().default("access"),

    JWT_REFRESH_EXPIRATION: joi.string().default("32h"),
    JWT_REFRESH_TYPE: joi.string().default("refresh"),
    JWT_VERIFIED_EXPIRATION: joi.number().default(28800),

    MONGODB_HOST: joi.string().default("mongodb://127.0.0.1:27017/example123"),

    GMAIL_USER_NAME: joi.string().default("mega.cleaning.2019@gmail.com"),
    GMAIL_USER_PASSWORD: joi.string(),
    GMAIL_SERVER_HOST: joi.string().default("smtp.gmail.com"),
    EMAIL_SERVER_PORT: joi.number().default(587),

    GOOGLE_CLIENT_ID: joi
      .string()
      .default(
        "263232388667-naii2nto8e34sv3bb7vsp8jf2h8jchbu.apps.googleusercontent.com"
      ),
    GOOGLE_CLIENT_SECRET: joi.string().default("zeCKlJEAzMJl19OvGoiMLs-v"),

    CLIENT_URL: joi.string().default("http://localhost:3000")
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
  clientUrl: envVars.CLIENT_URL,
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
  gmailServer: {
    host: envVars.GMAIL_SERVER_HOST
  },
  gmailUser: {
    email: envVars.GMAIL_USER_NAME,
    password: envVars.GMAIL_USER_PASSWORD
  },
  emailPort: envVars.EMAIL_SERVER_PORT,
  google: {
    clientID: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET
  }
};
