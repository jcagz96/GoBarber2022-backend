import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppintementDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppintementDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
