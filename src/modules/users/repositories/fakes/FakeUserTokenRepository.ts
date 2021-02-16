import { uuid } from 'uuidv4';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import {
  UserTokenDocument,
  UserToken,
} from '../../infra/mongoose/schemas/UserToken';

class FakeUserTokensRepository implements IUserTokenRepository {
  private userTokens: UserTokenDocument[] = [];

  public async generate(user: string): Promise<UserTokenDocument> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserTokenDocument | null> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );

    return userToken || null;
  }
}

export default FakeUserTokensRepository;
