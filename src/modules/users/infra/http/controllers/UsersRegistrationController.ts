
import { Request, Response } from 'express';

import CreateUserRegistrationService from '@modules/users/services/CreateUserRegistrationService';
import { container } from 'tsyringe';

export default class UsersRegistrationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, registrationToken, enabled } = request.body;

    const createUserRegistrationService: CreateUserRegistrationService = container.resolve(CreateUserRegistrationService);

    const user = await createUserRegistrationService.execute({
      user_id,
      registrationToken,
      enabled
    });

    return response.json(user);
  }
}
