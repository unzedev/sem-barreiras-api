import { RequestHandler } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

export default class ResetPasswordValidation {
  public post(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
      },
    });
  }
}
