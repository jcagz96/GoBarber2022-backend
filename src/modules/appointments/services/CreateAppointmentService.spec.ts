import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppoinment: CreateAppointmentService;

describe('CreateAppoinment', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppoinment = new CreateAppointmentService(fakeAppointmentsRepository);
  });

  it('should be able to create a new appointment', async () => {

    const appointment = await createAppoinment.execute({
      date: new Date(),
      provider_id: '12131321321312'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12131321321312');
  });

  it('should be able to create a new appointment', async () => {


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
