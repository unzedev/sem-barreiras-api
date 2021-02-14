import { container } from 'tsyringe';

import '@shared/providers';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/mongoose/repositories/UserRepository';

import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentRepository';
import EstablishmentsRepository from '@modules/establishments/infra/mongoose/repositories/EstablishmentRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IEstablishmentsRepository>(
  'EstablishmentsRepository',
  EstablishmentsRepository,
);
