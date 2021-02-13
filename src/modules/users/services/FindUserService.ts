import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { UserDocument as User } from '@modules/users/infra/mongoose/schemas/User';

import IUsersRepository from '@modules/users/repositories/IUserRepository';

interface Request {
  clientId: string;
}

@injectable()
class FindUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ clientId: userId }: Request): Promise<User> {
    const requesterUser = await this.usersRepository.findById(userId);

    if (!requesterUser) {
      throw new AppError('User not found.', 404);
    }

    return requesterUser;
  }
}

export default FindUser;
