import { Model } from 'mongoose';

import ICreateReviewDTO from '@modules/reviews/dtos/ICreateReview';
import IReviewsRepository from '@modules/reviews/repositories/IReviewsRepository';

import IListFilters from '@modules/reviews/dtos/IListFilters';
import { ReviewDocument, Review } from '../schemas/Review';

class ReviewsRepository implements IReviewsRepository {
  private ormRepository: Model<ReviewDocument>;

  constructor() {
    this.ormRepository = Review;
  }

  public async create(reviewData: ICreateReviewDTO): Promise<ReviewDocument> {
    const review = this.ormRepository.create(reviewData);

    return review;
  }

  public async findById(_id: string): Promise<ReviewDocument | null> {
    const review = await this.ormRepository.findOne({ _id });

    return review;
  }

  public async listByEstablishment(
    establishmentId: string,
  ): Promise<ReviewDocument[]> {
    const reviews = await this.ormRepository.find({
      establishment: establishmentId,
    });

    return reviews;
  }

  public async listWithFilters(
    filters: IListFilters,
  ): Promise<ReviewDocument[]> {
    const reviews = await this.ormRepository.find(filters);

    return reviews;
  }

  public async save(review: ReviewDocument): Promise<ReviewDocument> {
    const updatedReview = await this.ormRepository.updateOne(
      { _id: review.id },
      review,
    );

    return updatedReview;
  }
}

export default ReviewsRepository;
