import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';
import FindEstablishmentService from '@modules/establishments/services/FindEstablishmentService';

export default class EstablishmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { clientId: user } = request;

    const createEstablishment = container.resolve(CreateEstablishmentService);

    const establishment = await createEstablishment.execute({
      user,
      ...request.body,
    });

    return response.json(establishment);
  }

  async get(request: Request, response: Response): Promise<Response> {
    const { id: establishmentId } = request.params;

    const findEstablishment = container.resolve(FindEstablishmentService);

    const establishment = await findEstablishment.execute({ establishmentId });

    return response.json(establishment);
  }
}
