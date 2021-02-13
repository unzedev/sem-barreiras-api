import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';

describe('AuthenticatUser', () => {
  it('should authenticate a user', async () => {
    const email = 'johndoe@example.com';
    const password = '123';

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email,
      password,
      role: 'user',
      name: 'John Doe',
    });

    const response = await authenticateUser.execute({
      email,
      password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should NOT authenticate a user (user does not exists)', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticate = authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123',
    });

    expect(authenticate).rejects.toBeInstanceOf(AppError);
    expect(authenticate).rejects.toHaveProperty(
      'message',
      'Invalid credentials.',
    );
  });

  it('should NOT authenticate a user (wrong password)', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123',
      role: 'user',
    });

    const authenticate = authenticateUser.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password',
    });

    expect(authenticate).rejects.toBeInstanceOf(AppError);
    expect(authenticate).rejects.toHaveProperty(
      'message',
      'Invalid credentials.',
    );
  });
});
