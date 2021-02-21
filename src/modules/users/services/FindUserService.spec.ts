import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { UserDocument as User } from '@modules/users/infra/mongoose/schemas/User';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';

import FindUserService from './FindUserService';

describe('FindUser', () => {
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeHashProvider = new FakeHashProvider();
  let user: User;

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
  });

  it('should find user', async () => {
    const findUser = new FindUserService(fakeUsersRepository);

    const foundUser = await findUser.execute({
      clientId: user.id,
    });

    expect(foundUser).toHaveProperty('id');
    expect(foundUser?.name).toBe(user.name);
    expect(foundUser?.email).toBe(user.email);
    expect(foundUser?.role).toBe(user.role);
  });

  it('should NOT find user (invalid user)', async () => {
    const findUser = new FindUserService(fakeUsersRepository);

    const foundUser = findUser.execute({
      clientId: 'asdasd',
    });

    expect(foundUser).rejects.toBeInstanceOf(AppError);
    expect(foundUser).rejects.toHaveProperty('message', 'User not found.');
  });
});
