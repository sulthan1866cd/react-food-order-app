import { useEffect, useState, type ReactNode } from "react";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { HttpUtils } from "../utils/http.utils";
import { Role } from "../enum/role.enum";
import { toast } from "react-toastify";

const AuthGuard = ({
  children,
  requiredRoles,
}: {
  children: ReactNode;
  requiredRoles?: Role[];
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const { authorization } = useAuthContext()!;
  const navigate = useNavigate();
  const authUser = async () => {
    try {
      const result = await HttpUtils.get("auth/validate-token", {
        authorization,
      });
      if (!result.data) return;
      const userRole = result.data.role;
      if (!requiredRoles || userRole === Role.ADMIN) {
        setIsAuthorized(true);
        return;
      }
      if (!requiredRoles.find((role) => role === userRole)) {
        throw new Error("permission denided");
      }
      setIsAuthorized(true);
    } catch (error) {
      toast(`${error}`);
      navigate("/");
    }
  };
  useEffect(() => {
    if (!authorization) {
      navigate("/");
      return;
    }
    authUser();
  }, []);
  return <>{isAuthorized ? children :  <h1>Loading...</h1>}</>;
};

export default AuthGuard;
