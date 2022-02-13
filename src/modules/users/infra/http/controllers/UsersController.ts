
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import User from '../../typeorm/entities/User';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser: CreateUserService = container.resolve(CreateUserService);

    const user: User = await createUser.execute({
      name,
      email,
      password,
    });

    // delete user.password;

    return response.json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    });
  }
}
