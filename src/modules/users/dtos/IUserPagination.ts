import { UserDocument } from '../infra/mongoose/schemas/User';

export default interface UserPagination {
  users: UserDocument[];
  limit: number;
  offset: number;
  total: number;
}
