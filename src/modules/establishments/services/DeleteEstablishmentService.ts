import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IEstablishmentsRepository from '../repositories/IEstablishmentRepository';

interface Request {
  clientId: string;
  establishmentId: string;
}

@injectable()
class DeleteEstablishment {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute({ clientId, establishmentId }: Request): Promise<void> {
    const requesterUser = await this.usersRepository.findById(clientId);

    if (!requesterUser) {
      throw new AppError('User not found.', 404);
    }

    const establishment = await this.establishmentsRepository.findById(
      establishmentId,
    );

    if (!establishment) {
      throw new AppError('Establishment not found.', 404);
    }

    const userIsAdmin = requesterUser.role === 'administrator';
    const userOwnsEstablishment =
      requesterUser.id === String(establishment.user);

    if (!userOwnsEstablishment && !userIsAdmin) {
      throw new AppError('User not authorized.', 401);
    }

    await this.establishmentsRepository.delete(establishment.id);
  }
}

export default DeleteEstablishment;
