import { RequestHandler } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

export default class EstablishmentValidation {
  public post(): RequestHandler {
    return celebrate({
      [Segments.BODY]: {
        accessibilities: Joi.array()
          .items(
            Joi.object().keys({
              name: Joi.string().required(),
              has: Joi.boolean().required(),
            }),
          )
          .required(),
        address: Joi.object()
          .keys({
            city: Joi.string().required(),
            neighborhood: Joi.string().required(),
            zipCode: Joi.string().required(),
            street: Joi.string().required(),
            state: Joi.string().required(),
            number: Joi.number().min(1).required(),
            complement: Joi.string(),
          })
          .required(),
        cnpj: Joi.string().length(14).required(),
        type: Joi.string().required(),
        title: Joi.string().required(),
        link: Joi.string().uri(),
        phone: Joi.string(),
      },
    });
  }
}
