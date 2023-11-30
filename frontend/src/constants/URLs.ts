export const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_URL
  : '/api';

export const SOCKET_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_URL
  : '';
