import { container } from 'tsyringe';
import BCryptHashProvider from './implementations/BCryptHashProvider';
import IHashProvider from './modules/IHashProvider';


container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
