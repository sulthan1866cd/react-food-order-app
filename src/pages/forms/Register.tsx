import { useState } from "react";
import type { User } from "../../interface/user.interface";
import { useAuthContext } from "../../auth/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
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
  const {
    authorization,
    setAuthorization,
    setUsername: setContextUsername,
    setRole: setContextRole,
  } = useAuthContext()!;
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
    setAuthorization?.(result.data.authorization);
    setContextUsername?.(username);
    setContextRole?.(result.data.role);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("authorization", result.data.authorization || "");
    sessionStorage.setItem("role", result.data.role || "");
    navigate("/menu");
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register {isAdmin && "Admin"}</h1>
        {isAdmin && (
          <div className="form-group">
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.currentTarget.value)}
            >
              <option>{Role.ADMIN}</option>
              <option>{Role.CHEF}</option>
              <option>{Role.CUSTOMER}</option>
            </select>
          </div>
        )}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <button onClick={handleRegister}>Register</button>
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
