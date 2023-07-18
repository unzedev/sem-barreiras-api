import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashRepository from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import { UserDocument as User } from '@modules/users/infra/mongoose/schemas/User';
import { EstablishmentDocument as Establishment } from '@modules/establishments/infra/mongoose/schemas/Establishment';
import FakeEstablishmentsRepository from '@modules/establishments/repositories/fakes/FakeEstablishmentRepository';

import CreateUserService from '@modules/users/services/CreateUserService';
import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';
import FindEstablishmentService from '@modules/establishments/services/FindEstablishmentService';
import FakeReviewsRepository from '../repositories/fakes/FakeReviewsRepository';
import CreateReviewService from './CreateReviewService';
import UpdateEstablishmentRating from './UpdateEstablishmentRating';

describe('UpdateEstablishmentRating', () => {
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
        description: 'description',
      },
      cnpj: '213123',
      link: 'asdasd',
      phone: '123123123123',
      title: 'title test',
      type: 'type test',
    });
  });

  it('should create a review (updating rating)', async () => {
    const createReview = new CreateReviewService(
      fakeUsersRepository,
      fakeReviewRepository,
      fakeEstablishmentsRepository,
    );

    await createReview.execute({
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

    const updateRating = new UpdateEstablishmentRating(
      fakeReviewRepository,
      fakeEstablishmentsRepository,
    );

    await updateRating.execute({
      establishmentId: establishment.id,
    });

    const findEstablishment = new FindEstablishmentService(
      fakeEstablishmentsRepository,
    );

    const updatedEstablishment = await findEstablishment.execute({
      establishmentId: establishment.id,
    });

    expect(updatedEstablishment.rating).toBe(1);
  });

  it('should create several reviews (updating ratings)', async () => {
    const createReview = new CreateReviewService(
      fakeUsersRepository,
      fakeReviewRepository,
      fakeEstablishmentsRepository,
    );

    await createReview.execute({
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

    await createReview.execute({
      user: user.id,
      establishment: establishment.id,
      accessibilities: [
        {
          name: 'test',
          review: 'Não encontrei',
        },
      ],
      comment: 'test comment',
      rating: 2,
      strengths: 'test strengths',
      weaknesses: 'test weaknesses',
      title: 'test title',
    });

    await createReview.execute({
      user: user.id,
      establishment: establishment.id,
      accessibilities: [
        {
          name: 'test',
          review: 'Não encontrei',
        },
      ],
      comment: 'test comment',
      rating: 3,
      strengths: 'test strengths',
      weaknesses: 'test weaknesses',
      title: 'test title',
    });

    const updateRating = new UpdateEstablishmentRating(
      fakeReviewRepository,
      fakeEstablishmentsRepository,
    );

    await updateRating.execute({
      establishmentId: establishment.id,
    });

    const findEstablishment = new FindEstablishmentService(
      fakeEstablishmentsRepository,
    );

    const updatedEstablishment = await findEstablishment.execute({
      establishmentId: establishment.id,
    });

    expect(updatedEstablishment.rating).toBe(1.75);
  });

  it('should NOT update rating (invalid establishment)', async () => {
    const updateRating = new UpdateEstablishmentRating(
      fakeReviewRepository,
      fakeEstablishmentsRepository,
    );

    const update = updateRating.execute({
      establishmentId: 'asd',
    });

    expect(update).rejects.toBeInstanceOf(AppError);
    expect(update).rejects.toHaveProperty(
      'message',
      'Establishment not found.',
    );
  });
});
