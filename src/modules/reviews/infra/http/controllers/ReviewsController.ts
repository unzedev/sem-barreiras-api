import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateReviewService from '@modules/reviews/services/CreateReviewService';
import FindReviewService from '@modules/reviews/services/FindReviewService';

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
}
