import { UserDocument as User } from '../infra/mongoose/schemas/User';

import ICreateUser from '../dtos/ICreateUser';

export default interface IAdminRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: ICreateUser): Promise<User>;
  save(user: User): Promise<User>;
  list(): Promise<User[]>;
}
