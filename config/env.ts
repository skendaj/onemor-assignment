import Constants from 'expo-constants';

const ENV = {
  dev: {
    API_URL: 'https://app.onemor.com/api',
    AUTH_TOKEN: '1229|HA5ttrW9wpncj6K4gw0oWTziqKnsObc6hQQCJ1jg36ba5ca1',
  },
  prod: {
    API_URL: 'https://app.onemor.com/api',
    AUTH_TOKEN: process.env.EXPO_PUBLIC_AUTH_TOKEN,
  },
} as const;

type EnvType = keyof typeof ENV;

const getEnvVars = () => {
  const env = (Constants.expoConfig?.extra?.ENV || 'dev') as EnvType;
  return ENV[env];
};

export default getEnvVars();
