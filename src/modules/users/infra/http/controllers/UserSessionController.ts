import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUser from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUser);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user._doc.password;

    return response.json({ user, token });
  }
}
