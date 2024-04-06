export const getApiUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_APP_BACKEND_URL_PROD;
