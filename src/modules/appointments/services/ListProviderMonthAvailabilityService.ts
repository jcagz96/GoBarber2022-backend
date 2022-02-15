import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { getDaysInMonth, getDate } from 'date-fns';
import 'reflect-metadata';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }

  public async execute({ provider_id, year, month }: IRequest): Promise<IResponse> {

    //return all appointments in month
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id: provider_id,
      month: month,
      year: year
    });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    // create an array like : [1,2,3,4......30/31]
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    //appointments are possible only from 8h to 17h

    const availability = eachDayArray.map(day => {
      // return all appointments of a day
      const appointmentInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      /*       console.log(`\n : ${appointmentInDay}`)
            console.log(`\n {available: ${appointmentInDay.length}, day: ${day}}`) */

      return {
        day,
        available: appointmentInDay.length < 10,
      }
    })

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
