import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IReviewsRepository from '../repositories/IReviewsRepository';

interface Request {
  clientId: string;
  reviewId: string;
}

@injectable()
class DeleteReview {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,
  ) {}

  public async execute({ clientId, reviewId }: Request): Promise<void> {
    const requesterUser = await this.usersRepository.findById(clientId);

    if (!requesterUser) {
      throw new AppError('User not found.', 404);
    }

    const review = await this.reviewsRepository.findById(reviewId);

    if (!review) {
      throw new AppError('Review not found.', 404);
    }

    const userIsAdmin = requesterUser.role === 'administrator';
    const userOwnsReview = requesterUser.id === String(review.user._id);

    if (!userOwnsReview && !userIsAdmin) {
      throw new AppError('User not authorized.', 401);
    }

    await this.reviewsRepository.delete(review.id);
  }
}

export default DeleteReview;
