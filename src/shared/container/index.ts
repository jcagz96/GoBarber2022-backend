import { container, delay } from 'tsyringe';

import '@modules/users/providers/HashProvider';
import '@shared/container/providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import UserRegistrationTokenRepository from '@modules/users/infra/typeorm/repositories/UserRegistrationTokenRepository';
import IUserRegistrationTokensRepository from '@modules/users/repositories/IUserRegistrationTokensRepository';

import UserSocketsRepository from '@modules/users/infra/typeorm/repositories/UserSocketsRepository';
import IUserSocketsRepository from '@modules/users/repositories/IUserSocketsRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);

container.registerSingleton<INotificationsRepository>('NotificationsRepository', NotificationsRepository);

container.registerSingleton<IUserRegistrationTokensRepository>('UserRegistrationTokenRepository', UserRegistrationTokenRepository);

container.registerSingleton<IUserSocketsRepository>('UserSocketsRepository', delay(() => UserSocketsRepository));








