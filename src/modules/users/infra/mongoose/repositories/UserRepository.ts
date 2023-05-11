import { Model } from 'mongoose';

import ICreateUser from '@modules/users/dtos/ICreateUser';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

import IListFilters from '@modules/users/dtos/IListFilters';
import UserPagination from '@modules/users/dtos/IUserPagination';
import { UserDocument, User } from '../schemas/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Model<UserDocument>;

  constructor() {
    this.ormRepository = User;
  }

  public async create(userData: ICreateUser): Promise<UserDocument> {
    const user = this.ormRepository.create(userData);

    return user;
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }

  public async findById(_id: string): Promise<UserDocument | null> {
    const user = await this.ormRepository.findOne({ _id });

    return user;
  }

  public async save(user: UserDocument): Promise<UserDocument> {
    const updatedUser = await this.ormRepository.updateOne(
      { _id: user.id },
      user,
    );

    return updatedUser;
  }

  public async list(): Promise<UserDocument[]> {
    const users = await this.ormRepository.find({}, { password: 0 });

    return users;
  }
  
  public async listWithFilters(
    filtersList: IListFilters,
  ): Promise<UserPagination> {
    const { offset, limit, ...filters } = filtersList;

    const providedOffset = offset || 0;
    const providedLimit = limit || 10;

    const total = await this.ormRepository.countDocuments(filters);

    const findUsers = await this.ormRepository
      .find(filters)
      .sort({ rating: -1 })
      .skip(providedOffset)
      .limit(providedLimit);

    return {
      users: findUsers,
      limit: providedLimit,
      offset: providedOffset,
      total,
    };
  }  
}

export default UsersRepository;
