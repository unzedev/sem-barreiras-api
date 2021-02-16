import { RequestHandler } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

export default class EstablishmentValidation {
  public post(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        establishment: Joi.string().alphanum().length(24).required(),
        comment: Joi.string().required(),
        rating: Joi.number().required(),
        strengths: Joi.string().required(),
        weaknesses: Joi.string().required(),
        title: Joi.string().required(),
        accessibilities: Joi.array()
          .items(
            Joi.object().keys({
              name: Joi.string().required(),
              review: Joi.string()
                .valid('Não sei', 'Não encontrei', 'Encontrei')
                .required(),
            }),
          )
          .required(),
      },
    });
  }

  public list(): RequestHandler {
    return celebrate({
      [Segments.QUERY]: {
        status: Joi.string().valid('pending', 'approved'),
        establishment: Joi.string().alphanum().length(24),
      },
    });
  }
}
