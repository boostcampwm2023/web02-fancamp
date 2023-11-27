export const BASE_URL = import.meta.env.PROD
  ? import.meta.env.PRODUCTION_URL
  : '/api';

export const SOCKET_BASE_URL = import.meta.env.PROD
  ? import.meta.env.PRODUCTION_URL
  : '';
