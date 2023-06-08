import { RequestHandler } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

export default class UserValidation {
  public post(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.any().valid('user').required(),
        phone: Joi.string(),
        deficiency: Joi.string(),
      },
    });
  }
  public list(): RequestHandler {
    return celebrate({
      [Segments.QUERY]: {
        offset: Joi.number().min(0),
        limit: Joi.number().min(1),
        name: Joi.string(),
        email: Joi.string(),
        role: Joi.string(),
      },
    });
  }
}
