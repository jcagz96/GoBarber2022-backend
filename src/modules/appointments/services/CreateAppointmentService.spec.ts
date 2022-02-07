import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

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

  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppoinment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointmentDate = new Date();

    await createAppoinment.execute({
      date: appointmentDate,
      provider_id: '12131321321312'
    });

    await expect(
      createAppoinment.execute({
        date: appointmentDate,
        provider_id: '12131321321312'
      })).rejects.toBeInstanceOf(AppError)

  });
});
