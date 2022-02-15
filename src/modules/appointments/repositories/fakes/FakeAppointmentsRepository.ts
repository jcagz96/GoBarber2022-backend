import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { v4 as uuid } from 'uuid';
import { isEqual, getMonth, getDate, getYear } from 'date-fns';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {

  private appointments: Appointment[] = [];

  public async create({ date, provider_id, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;
    appointment.user_id = user_id;

    this.appointments.push(appointment);
    return appointment;

  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));
    return findAppointment;
  }

  public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment =>
      appointment.provider_id === provider_id &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year
    );
    return appointments;
  }

  public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment =>
      appointment.provider_id === provider_id &&
      getDate(appointment.date) === day &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year
    );
    return appointments;
  }

}

export default FakeAppointmentsRepository;
