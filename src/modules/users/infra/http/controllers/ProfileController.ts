
import { Request, Response } from 'express';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { container } from 'tsyringe';
import User from '../../typeorm/entities/User';

export default class ProfileController {

  public async show(request: Request, response: Response) {
    const showProfile: ShowProfileService = container.resolve(ShowProfileService);

    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.json({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at
    });

  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;
    const updateProfile: UpdateProfileService = container.resolve(UpdateProfileService);

    const user: User = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    // delete user.password;

    return response.json({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at
    });
  }
}
