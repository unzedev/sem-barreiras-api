import { UserTokenDocument as UserToken } from '../infra/mongoose/schemas/UserToken';

export default interface IUserTokensRepository {
  generate(user: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | null>;
}
