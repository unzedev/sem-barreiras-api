import { RequestHandler } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

export default class ForgotPasswordValidation {
  public post(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      },
    });
  }
}
