import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashRepository from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import { UserDocument as User } from '@modules/users/infra/mongoose/schemas/User';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import CreateEstablishmentService from './CreateEstablishmentService';
import FakeEstablishmentsRepository from '../repositories/fakes/FakeEstablishmentRepository';
import { EstablishmentDocument as Establishment } from '../infra/mongoose/schemas/Establishment';
import FindEstablishmentService from './FindEstablishmentService';
import UpdateEstablishmentPic from './UpdateEstablishmentPicService';

describe('UpdateEstablishment', () => {
  let user: User;
  let establishment: Establishment;

  const fakeHashProvider = new FakeHashRepository();
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeStorageProvider = new FakeStorageProvider();
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
        descricao: 'descricao',
      },
      cnpj: '213123',
      link: 'asdasd',
      phone: '123123123123',
      title: 'title test',
      type: 'type test',
    });
  });

  it('should update a establishment picture', async () => {
    const updateEstablishmentPic = new UpdateEstablishmentPic(
      fakeEstablishmentsRepository,
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const fileName = 'pic name';

    await updateEstablishmentPic.execute({
      establishmentId: establishment.id,
      clientId: user.id,
      fileName,
    });

    const findEstablishment = new FindEstablishmentService(
      fakeEstablishmentsRepository,
    );

    const updatedEstablishment = await findEstablishment.execute({
      establishmentId: establishment.id,
    });

    expect(updatedEstablishment).toHaveProperty('id');
    expect(updatedEstablishment.picture).toBe(fileName);
  });

  it('should NOT update a establishment picture (invalid user)', async () => {
    const updateEstablishmentPic = new UpdateEstablishmentPic(
      fakeEstablishmentsRepository,
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const updatePic = updateEstablishmentPic.execute({
      establishmentId: establishment.id,
      clientId: 'asd',
      fileName: 'as',
    });

    expect(updatePic).rejects.toBeInstanceOf(AppError);
    expect(updatePic).rejects.toHaveProperty('message', 'User not found');
  });

  it('should NOT update a establishment picture (invalid establishment)', async () => {
    const updateEstablishmentPic = new UpdateEstablishmentPic(
      fakeEstablishmentsRepository,
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const updatePic = updateEstablishmentPic.execute({
      establishmentId: 'asd',
      clientId: user.id,
      fileName: 'as',
    });

    expect(updatePic).rejects.toBeInstanceOf(AppError);
    expect(updatePic).rejects.toHaveProperty(
      'message',
      'Establishment not found',
    );
  });

  it('should NOT update a establishment picture (unauthorized user)', async () => {
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const newUser = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123',
      role: 'user',
      deficiency: 'test',
      phone: '123123',
    });

    const updateEstablishmentPic = new UpdateEstablishmentPic(
      fakeEstablishmentsRepository,
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const updatePic = updateEstablishmentPic.execute({
      establishmentId: establishment.id,
      clientId: newUser.id,
      fileName: 'as',
    });

    expect(updatePic).rejects.toBeInstanceOf(AppError);
    expect(updatePic).rejects.toHaveProperty(
      'message',
      'User not allowed to update',
    );
  });
});
