import { Model } from 'mongoose';

import ICreatestablishmentDTO from '@modules/establishments/dtos/ICreateEstablishment';
import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentRepository';

import IListFilters from '@modules/establishments/dtos/IListFilters';
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
    filters: IListFilters,
  ): Promise<EstablishmentDocument[]> {
    const establishments = await this.ormRepository.find(filters);

    return establishments;
  }
}

export default EstablishmentsRepository;
