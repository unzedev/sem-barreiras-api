import { EstablishmentDocument as Establishment } from '../infra/mongoose/schemas/Establishment';

import ICreateEstablishment from '../dtos/ICreateEstablishment';
import IListFilters from '../dtos/IListFilters';

export default interface IEstablishmentRepository {
  findById(id: string): Promise<Establishment | null>;
  create(data: ICreateEstablishment): Promise<Establishment>;
  save(establishment: Establishment): Promise<Establishment>;
  listWithFilters(filters: IListFilters): Promise<Establishment[]>;
}
