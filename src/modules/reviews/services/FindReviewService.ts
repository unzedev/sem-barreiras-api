import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { ReviewDocument as Review } from '@modules/reviews/infra/mongoose/schemas/Review';

import IReviewsRepository from '@modules/reviews/repositories/IReviewsRepository';

interface Request {
  reviewId: string;
}

@injectable()
class FindReview {
  constructor(
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,
  ) {}

  public async execute({ reviewId }: Request): Promise<Review> {
    const review = await this.reviewsRepository.findById(reviewId);

    if (!review) {
      throw new AppError('Review not found.', 404);
    }

    return review;
  }
}

export default FindReview;
