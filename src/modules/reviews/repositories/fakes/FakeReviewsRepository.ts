import { ObjectId } from 'mongodb';

import IReviewsRepository from '@modules/reviews/repositories/IReviewsRepository';
import ICreateReviewDTO from '@modules/reviews/dtos/ICreateReview';

import IListFilters from '@modules/reviews/dtos/IListFilters';
import IReviewPagination from '@modules/reviews/dtos/IReviewPagination';
import { ReviewDocument, Review } from '../../infra/mongoose/schemas/Review';

class ReviewsRepository implements IReviewsRepository {
  private reviews: ReviewDocument[] = [];

  public async findById(id: string): Promise<ReviewDocument | null> {
    const findReview = this.reviews.find(review => review.id === id);

    return findReview || null;
  }

  public async listByEstablishment(
    establishmentId: string,
  ): Promise<ReviewDocument[]> {
    const findReviews = this.reviews.filter(
      review => review.establishment == establishmentId,
    );

    return findReviews;
  }

  public async create(reviewData: ICreateReviewDTO): Promise<ReviewDocument> {
    const review = new Review();

    Object.assign(review, { id: new ObjectId() }, reviewData);

    this.reviews.push(review);

    return review;
  }

  public async listWithFilters(
    filters: IListFilters,
  ): Promise<IReviewPagination> {
    return this.reviews;
  }

  public async save(review: ReviewDocument): Promise<ReviewDocument> {
    const findIndex = this.reviews.findIndex(
      findReview => findReview.id === review.id,
    );

    this.reviews[findIndex] = review;

    return review;
  }

  public async delete(_id: string): Promise<void> {
    const findIndex = this.reviews.findIndex(review => review.id === _id);

    this.reviews.splice(findIndex, 1);
  }
}

export default ReviewsRepository;
