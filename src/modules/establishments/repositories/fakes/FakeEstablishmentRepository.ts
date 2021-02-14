import { ObjectId } from 'mongodb';

import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentRepository';
import ICreateEstablishmentDTO from '@modules/establishments/dtos/ICreateEstablishment';

import {
  EstablishmentDocument,
  Establishment,
} from '../../infra/mongoose/schemas/Establishment';

class EstablishmentsRepository implements IEstablishmentsRepository {
  private establishments: EstablishmentDocument[] = [];

  public async findById(id: string): Promise<EstablishmentDocument | null> {
    const findEstablishment = this.establishments.find(
      establishment => establishment.id === id,
    );

    return findEstablishment || null;
  }

  public async create(
    establishmentData: ICreateEstablishmentDTO,
  ): Promise<EstablishmentDocument> {
    const establishment = new Establishment();

    Object.assign(establishment, { id: new ObjectId() }, establishmentData);

    this.establishments.push(establishment);

    return establishment;
  }
}

export default EstablishmentsRepository;