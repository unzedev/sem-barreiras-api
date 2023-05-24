import { Model } from 'mongoose';

import ICreateReviewDTO from '@modules/reviews/dtos/ICreateReview';
import IReviewsRepository from '@modules/reviews/repositories/IReviewsRepository';

import IListFilters from '@modules/reviews/dtos/IListFilters';
import IReviewPagination from '@modules/reviews/dtos/IReviewPagination';
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
    const review = await this.ormRepository
      .findOne({ _id })
      .populate('user', ['name', 'email']);

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
    filtersList: IListFilters,
  ): Promise<IReviewPagination> {
    const { offset, limit, ...filters } = filtersList;

    const providedOffset = offset || 0;
    const providedLimit = limit || 10;

    const total = await this.ormRepository.countDocuments(filters);

    const findReviews = await this.ormRepository
      .find(filters)
      .populate('user', ['name', 'email'])
      .sort({ rating: -1 })
      .skip(providedOffset)
      .limit(providedLimit);

    return {
      reviews: findReviews,
      limit: providedLimit,
      offset: providedOffset,
      total,
    };
  }

  public async save(review: ReviewDocument): Promise<ReviewDocument> {
    const updatedReview = await this.ormRepository.updateOne(
      { _id: review.id },
      review,
    );

    return updatedReview;
  }

  public async delete(_id: string): Promise<void> {
    await this.ormRepository.deleteOne({ _id });
  }
}

export default ReviewsRepository;
