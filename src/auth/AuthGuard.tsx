import { useEffect, type ReactNode } from "react";
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
  const authKey = useAuthContext()?.authKey;
  const navigate = useNavigate();
  const authUser = async () => {
    try {
      const result = await HttpUtils.get("auth/validate-token", {
        authorization: authKey,
      });
      const userRole = result.data.role;
      if (!requiredRoles || userRole === Role.ADMIN) return;
      if (!requiredRoles.find((role) => role === userRole)) {
        throw new Error("permission denided");
      }
    } catch (error) {
      toast(`${error}`);
      navigate("/");
    }
  };
  useEffect(() => {
    if (!authKey) {
      navigate("/");
      return;
    }
    authUser();
  });
  return children;
};

export default AuthGuard;
