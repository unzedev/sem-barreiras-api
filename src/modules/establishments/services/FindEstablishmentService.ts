import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { EstablishmentDocument as Establishment } from '@modules/establishments/infra/mongoose/schemas/Establishment';

import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentRepository';

interface Request {
  establishmentId: string;
}

@injectable()
class FindEstablishment {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute({ establishmentId }: Request): Promise<Establishment> {
    const establishment = await this.establishmentsRepository.findById(
      establishmentId,
    );

    if (!establishment) {
      throw new AppError('Establishment not found.', 404);
    }

    return establishment;
  }
}

export default FindEstablishment;
