import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

import IEstablishmentsRepository from '../repositories/IEstablishmentRepository';

import { EstablishmentDocument as Establishment } from '../infra/mongoose/schemas/Establishment';

interface Request {
  clientId: string;
  establishmentId: string;
}

@injectable()
class ApproveEstablishment {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    establishmentId,
    clientId,
  }: Request): Promise<Establishment> {
    const userRequester = await this.usersRepository.findById(clientId);

    if (!userRequester) {
      throw new AppError('User not found', 401);
    }

    if (userRequester.role !== 'administrator') {
      throw new AppError('User not authorized', 401);
    }

    const establishment = await this.establishmentsRepository.findById(
      establishmentId,
    );

    if (!establishment) {
      throw new AppError('Establishment not found', 404);
    }

    establishment.status = 'approved';

    await this.establishmentsRepository.save(establishment);

    return establishment;
  }
}

export default ApproveEstablishment;
