import { ObjectId } from 'mongodb';

import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentRepository';
import ICreateEstablishmentDTO from '@modules/establishments/dtos/ICreateEstablishment';

import IListFilters from '@modules/establishments/dtos/IListFilters';
import IEstablishmentPagination from '@modules/establishments/dtos/IEstablishmentPagination';
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

  public async save(
    establishment: EstablishmentDocument,
  ): Promise<EstablishmentDocument> {
    const findIndex = this.establishments.findIndex(
      findEstablishment => findEstablishment.id === establishment.id,
    );

    this.establishments[findIndex] = establishment;

    return establishment;
  }

  public async listWithFilters(
    filters: IListFilters,
  ): Promise<IEstablishmentPagination> {
    return this.establishments;
  }

  public async delete(_id: string): Promise<void> {
    const findIndex = this.establishments.findIndex(
      establishment => establishment.id === _id,
    );

    this.establishments.splice(findIndex, 1);
  }
}

export default EstablishmentsRepository;
