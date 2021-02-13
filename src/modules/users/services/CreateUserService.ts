import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { UserDocument as User } from '@modules/users/infra/mongoose/schemas/User';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUserRepository';

interface Request {
  name: string;
  email: string;
  password: string;
  phone?: string;
  deficiency?: string;
  role: 'administrator' | 'user';
}

@injectable()
class CreateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(request: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(
      request.email,
    );

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(
      request.password,
    );

    const user = await this.usersRepository.create({
      ...request,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUser;
