import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
interface AuthType {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  role: string;
  setRole: Dispatch<SetStateAction<string>>;
  authorization: string;
  setAuthorization: Dispatch<SetStateAction<string>>;
}
const AuthContext = createContext<AuthType | null>(null);

export default AuthContext;

export const useAuthContext = (): AuthType | null => {
  return useContext<AuthType | null>(AuthContext);
};
