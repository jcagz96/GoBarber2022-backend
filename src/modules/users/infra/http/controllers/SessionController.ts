
import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';
import { instanceToPlain } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser: AuthenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: instanceToPlain(user), token });
  }
}
