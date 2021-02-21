import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IReviewsRepository from '@modules/reviews/repositories/IReviewsRepository';
import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentRepository';

interface Request {
  establishmentId: string;
}

@injectable()
class UpdateEstablishmentRating {
  constructor(
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,

    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute({ establishmentId }: Request): Promise<void> {
    const establishment = await this.establishmentsRepository.findById(
      establishmentId,
    );

    if (!establishment) {
      throw new AppError('Establishment not found.', 404);
    }

    const establishmentReviews = await this.reviewsRepository.listByEstablishment(
      establishment.id,
    );

    const allRatings = establishmentReviews.map(review => review.rating);

    const sumAllRatings = allRatings.reduce((a, b) => a + b, 0);

    const establishmentRating = sumAllRatings / establishmentReviews.length; // average rating

    establishment.rating =
      establishmentReviews.length > 0 ? establishmentRating : 0;

    await this.establishmentsRepository.save(establishment);
  }
}

export default UpdateEstablishmentRating;
