import { useState } from "react";
import type { User } from "../../interface/user.interface";
import { useAuthContext } from "../../auth/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./forms.scss";
import { HttpUtils } from "../../utils/http.utils";
import { Role } from "../../enum/role.enum";
import { Validator } from "../../utils/validator.utils";

//decreases repetition but adds confution
// has 2 pages 
// bad code
const Register = ({ isAdmin }: { isAdmin?: boolean }) => {
  const [role, setRole] = useState(Role.CUSTOMER);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const authCotext = useAuthContext();
  const authorization = authCotext?.authKey;
  const setAuthKey = authCotext?.setAuthKey;
  const setContextUsername = authCotext?.setUsername;
  const navigate = useNavigate();

  const handleRegister = async () => {
    setUsername(username.trim());
    setFullName(fullName.trim());
    setEmail(email.trim());
    if (!Validator.isValidForm(username, password, fullName, email)) {
      toast.warning("Please fill in all fields");
      return;
    }
    if (!Validator.isEmail(email)) {
      toast.warning("email in wrong format");
      return;
    }
    const result = await HttpUtils.post<Omit<User, "id">>(
      isAdmin ? "admin/users" : "users",
      {
        username,
        password,
        fullName,
        email,
        role,
      },
      { authorization }
    );
    if (isAdmin) return toast("added successfully");
    if (!result.data) return;
    setAuthKey?.(result.data.authKey);
    setContextUsername?.(username);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("authKey", result.data.authKey || "");
    navigate("/menu");
  };
  return (
    <div className="login-page">
      <h1>REGISTER {isAdmin && "Admin"}</h1>
      {isAdmin && (
        <select value={role} onChange={(e) => setRole(e.currentTarget.value)}>
          <option>{Role.ADMIN}</option>
          <option>{Role.CHEF}</option>
          <option>{Role.CUSTOMER}</option>
        </select>
      )}
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="full name"
        value={fullName}
        onChange={(e) => setFullName(e.currentTarget.value)}
      />
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
