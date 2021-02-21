import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';
import FindEstablishmentService from '@modules/establishments/services/FindEstablishmentService';
import ListEstablishmentService from '@modules/establishments/services/ListEstablishmentService';
import DeleteEstablishmentService from '@modules/establishments/services/DeleteEstablishmentService';

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

  async index(request: Request, response: Response): Promise<Response> {
    const filters = request.query;

    const listEstablishments = container.resolve(ListEstablishmentService);

    const establishments = await listEstablishments.execute(filters);

    return response.json(establishments);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { clientId } = request;
    const { id: establishmentId } = request.params;

    const deleteEstablishments = container.resolve(DeleteEstablishmentService);

    await deleteEstablishments.execute({
      clientId,
      establishmentId,
    });

    return response.send();
  }
}
