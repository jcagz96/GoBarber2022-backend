
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import User from '../../typeorm/entities/User';
import { instanceToPlain } from 'class-transformer';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser: CreateUserService = container.resolve(CreateUserService);

    const user: User = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json({ user: instanceToPlain(user) });
  }
}
