import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import FindUserService from '@modules/users/services/FindUserService';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(request.body);

    delete user._doc.password;

    return response.json(user);
  }

  async get(request: Request, response: Response): Promise<Response> {
    const { clientId } = request;

    const findUser = container.resolve(FindUserService);

    const user = await findUser.execute({ clientId });

    delete user._doc.password;

    return response.json(user);
  }
}
