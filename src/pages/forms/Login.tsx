import { useState } from "react";
import type { User } from "../../interface/user.interface";
import { useAuthContext } from "../../auth/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./forms.scss";
import { HttpUtils } from "../../utils/http.utils";
import { Validator } from "../../utils/validator.utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authCotext = useAuthContext();
  const setAuthorization = authCotext?.setAuthorization;
  const setContextUsername = authCotext?.setUsername;
  const setRole = authCotext?.setRole;
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
    setAuthorization?.(result.data.authorization);
    setContextUsername?.(username);
    setRole?.(result.data.role);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("authorization", result.data.authorization || "");
    sessionStorage.setItem("role", result.data.role || "");
    navigate("/pages");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Log In</h1>
        <div className="form-group">
          <label>Username or Email</label>
          <input
            type="text"
            placeholder="Enter your username or email"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
