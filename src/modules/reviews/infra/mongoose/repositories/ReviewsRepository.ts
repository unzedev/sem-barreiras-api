import { Model } from 'mongoose';

import ICreateReviewDTO from '@modules/reviews/dtos/ICreateReview';
import IReviewsRepository from '@modules/reviews/repositories/IReviewsRepository';

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
}

export default ReviewsRepository;
