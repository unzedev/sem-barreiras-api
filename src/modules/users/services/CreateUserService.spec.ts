import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';

describe('CreateUser', () => {
  it('should create a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123',
      role: 'user',
      deficiency: 'test',
      phone: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should NOT create a user (duplicated email)', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123',
      role: 'user',
      deficiency: 'test',
      phone: '123123',
    });

    expect(createUser.execute(user)).rejects.toBeInstanceOf(AppError);
    expect(createUser.execute(user)).rejects.toHaveProperty(
      'message',
      'Email address already used.',
    );
  });
});
