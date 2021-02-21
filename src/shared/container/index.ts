import { container } from 'tsyringe';

import '@shared/container/providers';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/mongoose/repositories/UserRepository';

import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentRepository';
import EstablishmentsRepository from '@modules/establishments/infra/mongoose/repositories/EstablishmentRepository';

import IReviewsRepository from '@modules/reviews/repositories/IReviewsRepository';
import ReviewsRepository from '@modules/reviews/infra/mongoose/repositories/ReviewsRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/mongoose/repositories/UserTokenRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IEstablishmentsRepository>(
  'EstablishmentsRepository',
  EstablishmentsRepository,
);

container.registerSingleton<IReviewsRepository>(
  'ReviewsRepository',
  ReviewsRepository,
);
