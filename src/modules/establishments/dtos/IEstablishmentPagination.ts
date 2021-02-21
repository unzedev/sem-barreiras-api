import { EstablishmentDocument } from '../infra/mongoose/schemas/Establishment';

export default interface EstablishmentPagination {
  establishments: EstablishmentDocument[];
  limit: number;
  offset: number;
  total: number;
}
