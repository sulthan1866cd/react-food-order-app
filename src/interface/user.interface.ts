import type { Role } from "../enum/role.enum";

export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: Role;
}
