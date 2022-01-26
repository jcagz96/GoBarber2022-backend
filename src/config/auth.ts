import { config } from 'dotenv';

config();

export default {
  jwt: {
    secret: String(process.env.AUTH_SECRET),
    expiresIn: process.env.AUTH_EXPIRES_IN_TOKEN,
  },
};
