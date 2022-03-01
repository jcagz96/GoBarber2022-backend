import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { instanceToPlain } from 'class-transformer';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {

    const user_id = request.user.id;

    const listProviders: ListProvidersService = container.resolve(ListProvidersService);
    const providers = await listProviders.execute({
      user_id
    });
    return response.json(instanceToPlain(providers));
  }
}
