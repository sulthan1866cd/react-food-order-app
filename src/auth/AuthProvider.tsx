import { useState, type ReactNode } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || ""
  );
  const [authorization, setAuthorization] = useState(
    sessionStorage.getItem("authorization") || ""
  );

  return (
    <AuthContext.Provider
      value={{ username, setUsername, authorization, setAuthorization }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
