import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { UserDocument as User } from '@modules/users/infra/mongoose/schemas/User';
import { EstablishmentDocument as Establishment } from '@modules/establishments/infra/mongoose/schemas/Establishment';

import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import CreateEstablishmentService from './CreateEstablishmentService';
import FakeEstablishmentsRepositories from '../repositories/fakes/FakeEstablishmentRepository';

import FindEstablishmentService from './FindEstablishmentService';

describe('FindEstablishment', () => {
  const fakeHashProvider = new FakeHashProvider();
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeEstablishmentRepository = new FakeEstablishmentsRepositories();

  let user: User;
  let establishment: Establishment;

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
      picture: 'pic test',
    });
  });

  it('should find establishment', async () => {
    const findEstablishment = new FindEstablishmentService(
      fakeEstablishmentRepository,
    );

    const foundEstablishment = await findEstablishment.execute({
      establishmentId: establishment.id,
    });

    expect(foundEstablishment).toHaveProperty('id');
    expect(foundEstablishment?.user).toBe(establishment.user);
    expect(foundEstablishment?.title).toBe(establishment.title);
  });

  it('should NOT find establishment (invalid establishment)', async () => {
    const findEstablishment = new FindEstablishmentService(
      fakeEstablishmentRepository,
    );

    const foundEstablishment = findEstablishment.execute({
      establishmentId: 'asdasd',
    });

    expect(foundEstablishment).rejects.toBeInstanceOf(AppError);
    expect(foundEstablishment).rejects.toHaveProperty(
      'message',
      'Establishment not found.',
    );
  });
});
