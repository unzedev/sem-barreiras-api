import { ReviewDocument } from '../infra/mongoose/schemas/Review';

export default interface ReviewPagination {
  reviews: ReviewDocument[];
  limit: number;
  offset: number;
  total: number;
}
