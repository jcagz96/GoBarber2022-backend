import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

class AppointmentRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;

    this.appointments.push(appointment);
    return appointment;

  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));
    return findAppointment;
  }
}

export default AppointmentRepository;
