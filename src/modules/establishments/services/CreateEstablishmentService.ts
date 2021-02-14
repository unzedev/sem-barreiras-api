import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import {
  Address,
  Accessibilities,
  EstablishmentDocument as Establishment,
} from '@modules/establishments/infra/mongoose/schemas/Establishment';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IEstablishmentsRepository from '../repositories/IEstablishmentRepository';

interface Request {
  picture?: string;
  accessibilities: Accessibilities[];
  cnpj: string;
  address: Address;
  link?: string;
  phone?: string;
  type: string;
  title: string;
  user: string;
}

@injectable()
class CreateEstablishment {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute(request: Request): Promise<Establishment> {
    const checkUserExists = await this.usersRepository.findById(request.user);

    if (!checkUserExists) {
      throw new AppError('User not found.', 401);
    }

    const establishment = await this.establishmentsRepository.create(request);

    return establishment;
  }
}

export default CreateEstablishment;
