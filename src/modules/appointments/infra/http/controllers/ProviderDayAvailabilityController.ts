import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {

    const provider_id = request.params.provider_id;
    const { day, month, year } = request.body;

    const listProviders: ListProviderDayAvailabilityService = container.resolve(ListProviderDayAvailabilityService);
    const availability = await listProviders.execute({
      provider_id,
      day,
      month,
      year
    });
    return response.json(availability);
  }
}
