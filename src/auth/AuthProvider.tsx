import { useState, type ReactNode } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || ""
  );
  const [authorization, setAuthorization] = useState(
    sessionStorage.getItem("authorization") || ""
  );
  const [role, setRole] = useState(
    sessionStorage.getItem("role") || ""
  );

  return (
    <AuthContext.Provider
      value={{ username, setUsername, authorization, setAuthorization, role, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
