export default {
  jwt: {
    secret: String(process.env.APP_SECRET),
    expiresIn: String(process.env.AUTH_EXPIRES_IN_TOKEN),
  },
};
