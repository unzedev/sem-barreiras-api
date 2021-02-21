import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ApproveReviewService from '@modules/reviews/services/ApproveReviewService';
import UpdateRatingService from '@modules/reviews/services/UpdateEstablishmentRating';

export default class ApproveEstablishmentController {
  async post(request: Request, response: Response): Promise<Response> {
    const { clientId } = request;
    const { id: reviewId } = request.params;

    const approveReview = container.resolve(ApproveReviewService);

    const review = await approveReview.execute({
      clientId,
      reviewId,
    });

    const updateRating = container.resolve(UpdateRatingService);

    await updateRating.execute({
      establishmentId: review.establishment,
    });

    return response.json(review);
  }
}
