import { RequestHandler } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

export default class UserValidation {
  public post(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.any().valid('administrator', 'user').required(),
        phone: Joi.string(),
        deficiency: Joi.string(),
      },
    });
  }
}
