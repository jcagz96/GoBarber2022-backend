import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar: UpdateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename,
    });
    return response.json({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  }
}
