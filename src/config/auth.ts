import 'dotenv/config';
interface IAuthConfig {
  jwt: {
    secret: string;
    expiresIn: string | number;
  }
}

export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: process.env.AUTH_EXPIRES_IN_TOKEN,
  },
} as IAuthConfig;
