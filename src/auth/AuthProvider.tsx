import { useState, type ReactNode } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || ""
  );
  const [authKey, setAuthKey] = useState(
    sessionStorage.getItem("authKey") || ""
  );

  return (
    <AuthContext.Provider
      value={{ username, setUsername, authKey, setAuthKey }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
