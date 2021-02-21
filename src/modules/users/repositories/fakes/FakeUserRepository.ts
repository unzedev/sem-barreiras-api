import { ObjectId } from 'mongodb';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUser';

import { UserDocument, User } from '../../infra/mongoose/schemas/User';

class UsersRepository implements IUsersRepository {
  private users: UserDocument[] = [];

  public async findByEmail(email: string): Promise<UserDocument | null> {
    const findUser = this.users.find(admin => admin.email === email);

    return findUser || null;
  }

  public async findById(id: string): Promise<UserDocument | null> {
    const findUser = this.users.find(user => user.id === id);

    return findUser || null;
  }

  public async create(userData: ICreateUserDTO): Promise<UserDocument> {
    const user = new User();

    Object.assign(user, { id: new ObjectId() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: UserDocument): Promise<UserDocument> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async list(): Promise<UserDocument[]> {
    return this.users;
  }
}

export default UsersRepository;
