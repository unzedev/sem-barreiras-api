import { ReviewDocument as Review } from '../infra/mongoose/schemas/Review';

import ICreateReview from '../dtos/ICreateReview';
import IListFilters from '../dtos/IListFilters';''
import IReviewPagination from '../dtos/IReviewPagination';

export default interface IReviewRepository {
  findById(id: string): Promise<Review | null>;
  listByEstablishment(establishmentId: string): Promise<Review[]>;
  create(data: ICreateReview): Promise<Review>;
  listWithFilters(filters: IListFilters): Promise<IReviewPagination>;
  save(review: Review): Promise<Review>;
  delete(id: string): Promise<void>;
  deleteByEstablishment(establishmentId: string): Promise<void>;
}
