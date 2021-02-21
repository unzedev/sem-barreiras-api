import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

import IEstablishmentsRepository from '../repositories/IEstablishmentRepository';

import { EstablishmentDocument as Establishment } from '../infra/mongoose/schemas/Establishment';

interface Request {
  clientId: string;
  establishmentId: string;
  fileName: string;
}

@injectable()
class UpdateEstablishmentPic {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    establishmentId,
    clientId,
    fileName,
  }: Request): Promise<Establishment> {
    const userRequester = await this.usersRepository.findById(clientId);

    if (!userRequester) {
      throw new AppError('User not found', 401);
    }

    const establishment = await this.establishmentsRepository.findById(
      establishmentId,
    );

    if (!establishment) {
      throw new AppError('Establishment not found', 404);
    }

    if (establishment.user != userRequester.id) {
      throw new AppError('User not allowed to update', 401);
    }

    if (establishment.picture) {
      await this.storageProvider.deleteFile(establishment.picture);
    }

    const filename = await this.storageProvider.saveFile(fileName);

    establishment.picture = filename;

    await this.establishmentsRepository.save(establishment);

    return establishment;
  }
}

export default UpdateEstablishmentPic;
