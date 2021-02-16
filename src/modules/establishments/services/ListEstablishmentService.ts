import { inject, injectable } from 'tsyringe';

import { EstablishmentDocument as Establishment } from '@modules/establishments/infra/mongoose/schemas/Establishment';

import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentRepository';

interface Request {
  title?: string;
  city?: string;
  state?: string;
  type?: string;
  status?: string;
}

@injectable()
class ListEstablishments {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute(filters: Request): Promise<Establishment[]> {
    if (filters.state) {
      filters['address.state'] = filters.state;
      delete filters.state;
    }

    if (filters.city) {
      filters['address.city'] = filters.city;
      delete filters.city;
    }

    const establishments = await this.establishmentsRepository.listWithFilters(
      filters,
    );

    return establishments;
  }
}

export default ListEstablishments;
