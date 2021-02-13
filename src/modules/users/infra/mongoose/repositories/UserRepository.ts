import { Model } from 'mongoose';

import ICreateUser from '@modules/users/dtos/ICreateUser';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

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
}

export default UsersRepository;
