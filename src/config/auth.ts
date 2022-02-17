export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: process.env.AUTH_EXPIRES_IN_TOKEN,
  },
};
