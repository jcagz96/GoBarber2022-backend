import { container } from 'tsyringe';
import ICacheProvider from './models/ICacheProvider';
import uploadConfig from '@config/upload';
import RedisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
