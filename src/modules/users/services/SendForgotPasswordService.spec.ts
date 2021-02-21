import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import { UserDocument as User } from '../infra/mongoose/schemas/User';

import SendForgotPasswordService from './SendForgotPasswordService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';

describe('SendForgotPassword', () => {
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeMailProvider = new FakeMailProvider();
  const fakeUserTokensRepository = new FakeUserTokensRepository();

  let user: User;

  beforeAll(async () => {
    user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123',
      role: 'user',
    });
  });

  it('should send forgot password recover email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const SendForgotPassword = new SendForgotPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );

    await SendForgotPassword.execute({
      email: user.email,
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should NOT send forgot password recover email (user does not exists)', async () => {
    const SendForgotPassword = new SendForgotPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );

    const forgotPass = SendForgotPassword.execute({
      email: 'johndoe@asd.com',
    });

    expect(forgotPass).rejects.toBeInstanceOf(AppError);
    expect(forgotPass).rejects.toHaveProperty('message', 'User not found.');
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const SendForgotPassword = new SendForgotPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );

    await SendForgotPassword.execute({
      email: user.email,
    });

    await expect(generateToken).toHaveBeenCalled();
  });
});
