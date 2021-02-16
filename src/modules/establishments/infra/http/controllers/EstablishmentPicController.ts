import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateEstablishmentPicService from '@modules/establishments/services/UpdateEstablishmentPicService';

export default class EstablishmentPictureController {
  async update(request: Request, response: Response): Promise<Response> {
    const { clientId } = request;
    const { filename: fileName } = request.file;
    const { id: establishmentId } = request.params;

    const updateEstablishmentPic = container.resolve(
      UpdateEstablishmentPicService,
    );

    const establishment = await updateEstablishmentPic.execute({
      clientId,
      fileName,
      establishmentId,
    });

    return response.json(establishment);
  }
}
