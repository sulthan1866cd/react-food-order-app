import { useState } from "react";
import type { User } from "../../interface/user.interface";
import { useAuthContext } from "../../auth/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./forms.scss";
import { HttpUtils } from "../../utils/http.utils";
import { Validator } from "../../utils/validator.utils";
import { Role } from "../../enum/role.enum";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authCotext = useAuthContext();
  const setAuthKey = authCotext?.setAuthKey;
  const setContextUsername = authCotext?.setUsername;
  const navigate = useNavigate();

  const handleLogin = async () => {
    setUsername(username.trim());
    if (!Validator.isValidForm(username, password)) {
      toast.warning("Please fill in all fields");
      return;
    }
    const result = await HttpUtils.post<Pick<User, "username" | "password">>(
      "auth",
      { username, password }
    );
    if (!result.data) return;
    setAuthKey?.(result.data.authorization);
    setContextUsername?.(username);
    console.log(result.data)
    if (result.data.role === Role.CUSTOMER) navigate("/menu");
    else navigate("/pages");
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("authKey", result.data.authorization || "");
  };

  return (
    <div className="login-page">
      <h1>LOG IN </h1>
      <input
        type="text"
        placeholder="username or email"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        no account yet? <Link to="/register">register</Link>
      </p>
    </div>
  );
};

export default Login;
