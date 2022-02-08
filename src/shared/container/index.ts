import { container } from 'tsyringe';

import '@modules/users/providers/HashProvider';
import '@shared/container/providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentRepository', AppointmentRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
// container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);








