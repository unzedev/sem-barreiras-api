import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashRepository from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import { UserDocument as User } from '@modules/users/infra/mongoose/schemas/User';

import CreateUserService from '@modules/users/services/CreateUserService';
import CreateEstablishmentService from './CreateEstablishmentService';
import FakeEstablishmentsRepository from '../repositories/fakes/FakeEstablishmentRepository';

describe('CreateEstablishment', () => {
  let user: User;

  const fakeHashProvider = new FakeHashRepository();
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeEstablishmentsRepository = new FakeEstablishmentsRepository();

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
  });

  it('should create a establishment', async () => {
    const createEstablishment = new CreateEstablishmentService(
      fakeUsersRepository,
      fakeEstablishmentsRepository,
    );

    const establishment = await createEstablishment.execute({
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

    expect(establishment).toHaveProperty('id');
  });

  it('should NOT create a establishment (invalid user)', async () => {
    const createEstablishment = new CreateEstablishmentService(
      fakeUsersRepository,
      fakeEstablishmentsRepository,
    );

    const establishment = createEstablishment.execute({
      user: 'asd',
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

    expect(establishment).rejects.toBeInstanceOf(AppError);
    expect(establishment).rejects.toHaveProperty('message', 'User not found.');
  });
});
