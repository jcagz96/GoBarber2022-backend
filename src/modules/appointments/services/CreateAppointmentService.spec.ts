import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import { addDays, getYear, addYears } from 'date-fns';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppoinment: CreateAppointmentService;

describe('CreateAppoinment', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppoinment = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
  });

  it('should be able to create a new appointment', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 5, 10, 12).getTime();
    });

    const appointment = await createAppoinment.execute({
      date: new Date(2023, 5, 10, 13),
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('should not be able to create two appoinments on the same time.', async () => {
    const appointmentDate = new Date(2199, 4, 10, 11);

    await createAppoinment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    await expect(
      createAppoinment.execute({
        date: appointmentDate,
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 5, 10, 12).getTime();
    });

    await expect(
      createAppoinment.execute({
        date: new Date(2023, 5, 10, 11),
        user_id: 'user-id',
        provider_id: 'provider-id',
      })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 5, 10, 12).getTime();
    });

    await expect(
      createAppoinment.execute({
        date: new Date(2023, 5, 10, 13),
        provider_id: 'jonhdoe-id',
        user_id: 'jonhdoe-id'
      })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 5, 10, 12).getTime();
    });

    await expect(
      createAppoinment.execute({
        date: new Date(2023, 5, 11, 7),
        user_id: 'user-id',
        provider_id: 'provider-id',
      })).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppoinment.execute({
        date: new Date(2023, 5, 18, 7),
        user_id: 'user-id',
        provider_id: 'provider-id',
      })).rejects.toBeInstanceOf(AppError);
  });


});
