import { startOfHour, isBefore, getHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {


  constructor(@inject('AppointmentsRepository')
  private appointmentsRepository: IAppointmentsRepository) {
  }


  public async execute({ date, provider_id, user_id }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't book an appointment on past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't book an appointment with yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError("You can only book appointments between 8am and 5pm");
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id
    });

    return appointment;
  }
}

export default CreateAppointmentService;
