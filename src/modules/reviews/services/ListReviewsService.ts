import { inject, injectable } from 'tsyringe';

import { ReviewDocument as Review } from '@modules/reviews/infra/mongoose/schemas/Review';

import IReviewsRepository from '@modules/reviews/repositories/IReviewsRepository';

interface Request {
  establishment?: string;
  status?: string;
}

@injectable()
class ListReviews {
  constructor(
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,
  ) {}

  public async execute(filters: Request): Promise<Review[]> {
    const reviews = await this.reviewsRepository.listWithFilters(filters);

    return reviews;
  }
}

export default ListReviews;
