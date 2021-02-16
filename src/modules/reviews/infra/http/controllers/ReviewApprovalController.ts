import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ApproveReviewService from '@modules/reviews/services/ApproveReviewService';

export default class ApproveEstablishmentController {
  async post(request: Request, response: Response): Promise<Response> {
    const { clientId } = request;
    const { id: reviewId } = request.params;

    const approveReview = container.resolve(ApproveReviewService);

    const review = await approveReview.execute({
      clientId,
      reviewId,
    });

    return response.json(review);
  }
}
