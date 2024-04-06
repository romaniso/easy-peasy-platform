import.meta.env.PROD;

export const getApiUrl = import.meta.env.PROD
  ? process.env.REACT_APP_BACKEND_URL_PROD
  : "http://localhost:5000";
