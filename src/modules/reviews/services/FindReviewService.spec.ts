import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { UserDocument as User } from '@modules/users/infra/mongoose/schemas/User';
import { EstablishmentDocument as Establishment } from '@modules/establishments/infra/mongoose/schemas/Establishment';
import { ReviewDocument as Review } from '@modules/reviews/infra/mongoose/schemas/Review';

import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';
import FakeEstablishmentsRepositories from '@modules/establishments/repositories/fakes/FakeEstablishmentRepository';

import FakeReviewsRepositories from '../repositories/fakes/FakeReviewsRepository';
import CreateReviewService from './CreateReviewService';
import FindReviewService from './FindReviewService';

describe('FindReview', () => {
  const fakeHashProvider = new FakeHashProvider();
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeEstablishmentRepository = new FakeEstablishmentsRepositories();
  const fakeReviewRepository = new FakeReviewsRepositories();

  let user: User;
  let establishment: Establishment;
  let review: Review;

  beforeAll(async () => {
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123',
      role: 'user',
    });

    const createEstablishment = new CreateEstablishmentService(
      fakeUsersRepository,
      fakeEstablishmentRepository,
    );

    establishment = await createEstablishment.execute({
      user: user.id,
      accessibilities: [
        {
          name: 'test',
          has: true,
        },
      ],
      address: {
        city: 'city',
        neighborhood: 'district',
        number: 123,
        state: 'RS',
        street: 'test street',
        zipCode: '123123',
        complement: 'complement test',
      },
      cnpj: '213123',
      link: 'asdasd',
      phone: '123123123123',
      title: 'title test',
      type: 'type test',
    });

    const createReview = new CreateReviewService(
      fakeUsersRepository,
      fakeReviewRepository,
      fakeEstablishmentRepository,
    );

    review = await createReview.execute({
      user: user.id,
      establishment: establishment.id,
      accessibilities: [
        {
          name: 'test',
          review: 'Não encontrei',
        },
      ],
      comment: 'test comment',
      rating: 1,
      strengths: 'test strengths',
      weaknesses: 'test weaknesses',
      title: 'test title',
    });
  });

  it('should find review', async () => {
    const findReview = new FindReviewService(fakeReviewRepository);

    const foundReview = await findReview.execute({
      reviewId: review.id,
    });

    expect(foundReview).toHaveProperty('id');
    expect(foundReview?.user).toBe(review.user);
    expect(foundReview?.title).toBe(review.title);
    expect(foundReview?.establishment).toBe(review.establishment);
  });

  it('should NOT find review (invalid review)', async () => {
    const findReview = new FindReviewService(fakeReviewRepository);

    const foundReview = findReview.execute({
      reviewId: 'asdasd',
    });

    expect(foundReview).rejects.toBeInstanceOf(AppError);
    expect(foundReview).rejects.toHaveProperty('message', 'Review not found.');
  });
});
