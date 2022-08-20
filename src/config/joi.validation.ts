import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB_HOST: Joi.string().required(),
  APP_PORT: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  PRODUCTS_SERVICE: Joi.string().required(),
  // API_KEY: Joi.string().required(),
});
