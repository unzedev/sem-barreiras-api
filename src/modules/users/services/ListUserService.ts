import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { UserDocument as User } from '../infra/mongoose/schemas/User';
import IListFilters from '../dtos/IListFilters';
import IUserPagination from '../dtos/IUserPagination';

interface Request {
  name?: string;
  email?: string;
  role?: string;
}

@injectable()
class ListUsers {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(filters: Request, clientId : string):  Promise<IUserPagination> {
    const user = await this.usersRepository.findById(clientId);

    if (!user || user.role !== 'administrator') {
      throw new AppError('User not authorized');
    }

    if (filters.name) {
      filters.name = { $regex: new RegExp(filters.name, 'i') };
    }

    if (filters.email) {
      filters.email = { $regex: new RegExp(filters.email, 'i') };
    }

    if (filters.role) {
      filters.role = { $regex: new RegExp(filters.role, 'i') };
    }

    const users = await this.usersRepository.listWithFilters(filters);

    return users;
  }
}

export default ListUsers;
