import { RequestHandler } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

export default class UserSessionValidation {
  public post(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    });
  }
}
