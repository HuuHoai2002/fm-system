export const ApiEndpoint = {
  // Auth
  login: "/api/v1/auth/login-with-permission",
  logout: "/api/v1/auth/logout",
  register: "/api/v1/auth/register",
  checkEmailExist: "/api/v1/auth/check-email-exist",
  forgotPassword: "/api/v1/auth/forgot-password",
  resetPassword: "/api/v1/auth/reset-password",
  changePassword: "/api/v1/auth/change-password",
  verify: "/api/v1/auth/verify",

  // Me
  getMe: "/api/v1/me",

  // Account
  accounts: "/api/v1/accounts",

  // Department
  departments: "/api/v1/departments",

  // Property
  properties: "/api/v1/properties",
  // Statistical
  getStatistical: "/api/v1/report-statistical",

  // Form
  forms: "/api/v1/forms",

  // Form Response
  formResponses: "/api/v1/form/responses",
};
