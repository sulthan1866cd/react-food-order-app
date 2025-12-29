export const Role = {
  CUSTOMER: "customer",
  CHEF: "chef",
  ADMIN: "admin",
};

export type Role = (typeof Role)[keyof typeof Role];
