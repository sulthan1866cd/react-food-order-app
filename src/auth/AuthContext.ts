import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
interface AuthType {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  authKey: string;
  setAuthKey: Dispatch<SetStateAction<string>>;
}
const AuthContext = createContext<AuthType | null>(null);

export default AuthContext;

export const useAuthContext = () => {
  return useContext(AuthContext) ;
};
