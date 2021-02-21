import { inject, injectable } from 'tsyringe';

import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentRepository';
import IEstablishmentPagination from '../dtos/IEstablishmentPagination';

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

  public async execute(filters: Request): Promise<IEstablishmentPagination> {
    if (filters.state) {
      filters['address.state'] = { $regex: new RegExp(filters.state, 'i') };
      delete filters.state;
    }

    if (filters.city) {
      filters['address.city'] = { $regex: new RegExp(filters.city, 'i') };
      delete filters.city;
    }

    if (filters.title) {
      filters.title = { $regex: new RegExp(filters.title, 'i') };
    }

    const establishments = await this.establishmentsRepository.listWithFilters(
      filters,
    );

    return establishments;
  }
}

export default ListEstablishments;
