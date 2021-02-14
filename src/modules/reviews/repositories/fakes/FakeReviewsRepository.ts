import { ObjectId } from 'mongodb';

import IReviewsRepository from '@modules/reviews/repositories/IReviewsRepository';
import ICreateReviewDTO from '@modules/reviews/dtos/ICreateReview';

import { ReviewDocument, Review } from '../../infra/mongoose/schemas/Review';

class ReviewsRepository implements IReviewsRepository {
  private reviews: ReviewDocument[] = [];

  public async findById(id: string): Promise<ReviewDocument | null> {
    const findReview = this.reviews.find(review => review.id === id);

    return findReview || null;
  }

  public async create(reviewData: ICreateReviewDTO): Promise<ReviewDocument> {
    const review = new Review();

    Object.assign(review, { id: new ObjectId() }, reviewData);

    this.reviews.push(review);

    return review;
  }
}

export default ReviewsRepository;