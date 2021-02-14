import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashRepository from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import { UserDocument as User } from '@modules/users/infra/mongoose/schemas/User';
import { EstablishmentDocument as Establishment } from '@modules/establishments/infra/mongoose/schemas/Establishment';
import FakeEstablishmentsRepository from '@modules/establishments/repositories/fakes/FakeEstablishmentRepository';

import CreateUserService from '@modules/users/services/CreateUserService';
import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';
import FakeReviewsRepository from '../repositories/fakes/FakeReviewsRepository';
import CreateReviewService from './CreateReviewService';

describe('CreateReview', () => {
  let user: User;
  let establishment: Establishment;

  const fakeHashProvider = new FakeHashRepository();
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeEstablishmentsRepository = new FakeEstablishmentsRepository();
  const fakeReviewRepository = new FakeReviewsRepository();

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
      deficiency: 'test',
      phone: '123123',
    });

    const createEstablishment = new CreateEstablishmentService(
      fakeUsersRepository,
      fakeEstablishmentsRepository,
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
      picture: 'pic test',
    });
  });

  it('should create a review', async () => {
    const createReview = new CreateReviewService(
      fakeUsersRepository,
      fakeReviewRepository,
      fakeEstablishmentsRepository,
    );

    const review = await createReview.execute({
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

    expect(review).toHaveProperty('id');
  });

  it('should NOT create a review (invalid user)', async () => {
    const createReview = new CreateReviewService(
      fakeUsersRepository,
      fakeReviewRepository,
      fakeEstablishmentsRepository,
    );

    const review = createReview.execute({
      user: 'asd',
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

    expect(review).rejects.toBeInstanceOf(AppError);
    expect(review).rejects.toHaveProperty('message', 'User not found.');
  });

  it('should NOT create a review (invalid establishment)', async () => {
    const createReview = new CreateReviewService(
      fakeUsersRepository,
      fakeReviewRepository,
      fakeEstablishmentsRepository,
    );

    const review = createReview.execute({
      user: user.id,
      establishment: 'asd',
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

    expect(review).rejects.toBeInstanceOf(AppError);
    expect(review).rejects.toHaveProperty(
      'message',
      'Establishment not found.',
    );
  });
});
