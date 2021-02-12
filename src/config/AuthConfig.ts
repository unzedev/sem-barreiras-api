interface IAuthConfig {
  jwt: {
    expiresIn: string;
    secret: string;
  };
}

const AuthConfig: IAuthConfig = {
  jwt: {
    expiresIn: '1d',
    secret: String(process.env.APP_SECRET),
  },
};

export default AuthConfig;
