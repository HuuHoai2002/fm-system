export const appLinks = {
  home: "/dashboard",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/verify/forgot-password",
  resetPassword: "/verify/reset-password",
  account: "/dashboard/accounts",
  department: "/dashboard/departments",
  property: "/dashboard/properties",
  createAccount: "/dashboard/accounts/new",
  editAccount: (id: string) => `/dashboard/accounts/edit/${id}`,
  createDepartment: "/dashboard/departments/new",
  editDepartment: (id: string) => `/dashboard/departments/edit/${id}`,
  createProperty: "/dashboard/properties/new",
  editProperty: (id: string) => `/dashboard/properties/edit/${id}`,
};

export const publicRoutes = [
  appLinks.login,
  appLinks.signup,
  appLinks.forgotPassword,
  appLinks.resetPassword,
];
