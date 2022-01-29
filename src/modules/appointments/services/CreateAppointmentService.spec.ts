import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppoinment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppoinment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await createAppoinment.execute({
      date: new Date(),
      provider_id: '12131321321312'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12131321321312');
  });
});
