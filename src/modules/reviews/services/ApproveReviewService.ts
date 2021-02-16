import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

import IReviewsRepository from '../repositories/IReviewsRepository';

import { ReviewDocument as Review } from '../infra/mongoose/schemas/Review';

interface Request {
  clientId: string;
  reviewId: string;
}

@injectable()
class ApproveReview {
  constructor(
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ reviewId, clientId }: Request): Promise<Review> {
    const userRequester = await this.usersRepository.findById(clientId);

    if (!userRequester) {
      throw new AppError('User not found', 401);
    }

    if (userRequester.role !== 'administrator') {
      throw new AppError('User not authorized', 401);
    }

    const review = await this.reviewsRepository.findById(reviewId);

    if (!review) {
      throw new AppError('Review not found', 404);
    }

    review.status = 'approved';

    await this.reviewsRepository.save(review);

    return review;
  }
}

export default ApproveReview;
