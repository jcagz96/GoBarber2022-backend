
import { Request, Response } from 'express';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { container } from 'tsyringe';
import User from '../../typeorm/entities/User';
import { instanceToPlain } from 'class-transformer';

export default class ProfileController {

  public async show(request: Request, response: Response) {
    const showProfile: ShowProfileService = container.resolve(ShowProfileService);

    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });


    return response.json({ user: instanceToPlain(user) });

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

    return response.json({ user: instanceToPlain(user) });
  }
}
