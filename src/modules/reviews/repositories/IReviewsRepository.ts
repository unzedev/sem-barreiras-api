import { ReviewDocument as Review } from '../infra/mongoose/schemas/Review';

import ICreateReview from '../dtos/ICreateReview';

export default interface IReviewRepository {
  findById(id: string): Promise<Review | null>;
  create(data: ICreateReview): Promise<Review>;
}
