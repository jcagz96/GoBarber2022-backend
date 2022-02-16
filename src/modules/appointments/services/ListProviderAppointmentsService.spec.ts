import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {



    //4 may 2023 8am
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2023, 4, 20, 14, 0, 0),
      user_id: 'user',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2023, 4, 20, 15, 0, 0),
      user_id: 'user',
    });

    /*     jest.spyOn(Date, 'now').mockImplementationOnce(() => {
          return new Date(2023, 4, 20, 11).getTime();
        }); */

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2023,
      month: 5,
      day: 20
    });

    expect(appointments).toEqual(
      expect.arrayContaining([
        appointment1,
        appointment2
      ]),
    );
  });
});
