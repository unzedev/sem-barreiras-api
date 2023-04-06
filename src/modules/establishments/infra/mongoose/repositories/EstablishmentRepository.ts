import { Model } from 'mongoose';

import ICreatestablishmentDTO from '@modules/establishments/dtos/ICreateEstablishment';
import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentRepository';

import IListFilters from '@modules/establishments/dtos/IListFilters';
import EstablishmentPagination from '@modules/establishments/dtos/IEstablishmentPagination';
import { EstablishmentDocument, Establishment } from '../schemas/Establishment';

class EstablishmentsRepository implements IEstablishmentsRepository {
  private ormRepository: Model<EstablishmentDocument>;

  constructor() {
    this.ormRepository = Establishment;
  }

  public async create(
    establishmentData: ICreatestablishmentDTO,
  ): Promise<EstablishmentDocument> {
    const establishment = this.ormRepository.create(establishmentData);

    return establishment;
  }

  public async findById(_id: string): Promise<EstablishmentDocument | null> {
    const establishment = await this.ormRepository.findOne({ _id });

    return establishment;
  }

  public async save(
    establishment: EstablishmentDocument,
  ): Promise<EstablishmentDocument> {
    const updatedEstablishment = await this.ormRepository.updateOne(
      { _id: establishment.id },
      establishment,
    );

    return updatedEstablishment;
  }

  public async listWithFilters(
    filtersList: IListFilters,
  ): Promise<EstablishmentPagination> {
    const { offset, limit, ...filters } = filtersList;

    const providedOffset = offset || 0;
    const providedLimit = limit || 10;

    const total = await this.ormRepository.countDocuments(filters);

    const findEstablishments = await this.ormRepository
      .find(filters)
      .sort({ rating: -1 })
      .skip(providedOffset)
      .limit(providedLimit);

    return {
      establishments: findEstablishments,
      limit: providedLimit,
      offset: providedOffset,
      total,
    };
  }

  public async delete(_id: string): Promise<void> {
    await this.ormRepository.deleteOne({ _id });
  }
}

export default EstablishmentsRepository;
