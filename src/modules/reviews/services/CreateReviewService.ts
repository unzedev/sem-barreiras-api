import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import {
  Accessibilities,
  ReviewDocument as Review,
} from '@modules/reviews/infra/mongoose/schemas/Review';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentRepository';
import IReviewsRepository from '../repositories/IReviewsRepository';

interface Request {
  accessibilities: Accessibilities[];
  comment: string;
  rating: number;
  title: string;
  strengths: string;
  weaknesses: string;
  establishment: string;
  user: string;
}

@injectable()
class CreateReview {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,

    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute(request: Request): Promise<Review> {
    const checkUserExists = await this.usersRepository.findById(request.user);

    if (!checkUserExists) {
      throw new AppError('User not found.', 401);
    }

    const checkEstablishmentExists = await this.establishmentsRepository.findById(
      request.establishment,
    );

    if (!checkEstablishmentExists) {
      throw new AppError('Establishment not found.', 401);
    }

    const review = await this.reviewsRepository.create(request);

    return review;
  }
}

export default CreateReview;
