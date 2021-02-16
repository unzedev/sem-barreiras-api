import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ApproveEstablishmentService from '@modules/establishments/services/ApproveEstablishmentService';

export default class ApproveEstablishmentController {
  async post(request: Request, response: Response): Promise<Response> {
    const { clientId } = request;
    const { id: establishmentId } = request.params;

    const approveEstablishment = container.resolve(ApproveEstablishmentService);

    const establishment = await approveEstablishment.execute({
      clientId,
      establishmentId,
    });

    return response.json(establishment);
  }
}
