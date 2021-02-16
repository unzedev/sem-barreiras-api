import { Model } from 'mongoose';

import IUserTokensRepository from '@modules/users/repositories/IUserTokenRepository';

import { uuid } from 'uuidv4';
import { UserTokenDocument, UserToken } from '../schemas/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Model<UserTokenDocument>;

  constructor() {
    this.ormRepository = UserToken;
  }

  public async findByToken(token: string): Promise<UserTokenDocument | null> {
    const userToken = await this.ormRepository.findOne({ token });

    return userToken;
  }

  public async generate(user: string): Promise<UserTokenDocument> {
    const token = uuid();

    const userToken = this.ormRepository.create({
      user,
      token,
    });

    return userToken;
  }
}

export default UserTokensRepository;
