import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateReviewService from '@modules/reviews/services/CreateReviewService';
import FindReviewService from '@modules/reviews/services/FindReviewService';
import UpdateRatingService from '@modules/reviews/services/UpdateEstablishmentRating';
import ListReviewsService from '@modules/reviews/services/ListReviewsService';
import DeleteReviewService from '@modules/reviews/services/DeleteReviewService';

export default class ReviewsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { clientId: user } = request;

    const createReview = container.resolve(CreateReviewService);

    const review = await createReview.execute({
      user,
      ...request.body,
    });

    return response.json(review);
  }

  async get(request: Request, response: Response): Promise<Response> {
    const { id: reviewId } = request.params;

    const findReview = container.resolve(FindReviewService);

    const review = await findReview.execute({ reviewId });

    return response.json(review);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const filters = request.query;

    const listReviews = container.resolve(ListReviewsService);

    const reviews = await listReviews.execute(filters);

    return response.json(reviews);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { clientId } = request;
    const { id: reviewId } = request.params;

    const findReview = container.resolve(FindReviewService);

    const review = await findReview.execute({ reviewId });

    const deleteReviews = container.resolve(DeleteReviewService);

    await deleteReviews.execute({
      clientId,
      reviewId,
    });

    const updateRating = container.resolve(UpdateRatingService);

    await updateRating.execute({
      establishmentId: review.establishment,
    });

    return response.send();
  }
}
