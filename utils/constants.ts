export const isDev = import.meta.env.MODE === 'development';

const DEV_API_URL = 'http://localhost:3000';
const PROD_API_URL = 'https://www.jobtrackr.co';

export const API_URL = isDev ? DEV_API_URL : PROD_API_URL;
export const SESSION_TOKEN = isDev ? 'authjs.session-token' : '__Secure-authjs.session-token';
