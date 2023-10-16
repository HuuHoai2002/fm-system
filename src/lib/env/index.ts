export const ENV = {
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  apiPrefix: process.env.NEXT_PUBLIC_API_PREFIX,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  isDevelopment: process.env.NODE_ENV === "development",
};
