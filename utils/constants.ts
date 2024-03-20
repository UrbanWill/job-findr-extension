const isProd = process.env.NODE_ENV === 'production';
const DEV_API_URL = 'http://localhost:3000';
const PROD_API_URL = 'http://google.com'; // TODO: Update with prod URL

export const API_URL = isProd ? PROD_API_URL : DEV_API_URL;
