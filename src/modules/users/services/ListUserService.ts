import { inject, injectable } from 'tsyringe';

import IEstablishmentsRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { UserDocument as User } from '../infra/mongoose/schemas/User';

interface Request {
  clientId: string;
}

@injectable()
class ListUsers {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IEstablishmentsRepository,
  ) {}

  public async execute({ clientId }: Request): Promise<User[]> {
    const user = await this.usersRepository.findById(clientId);

    if (!user || user.role !== 'administrator') {
      throw new AppError('User not authorized');
    }

    const users = await this.usersRepository.list();

    return users;
  }
}

export default ListUsers;
