import { useState } from "react";
import { HttpUtils } from "../../utils/http.utils";
import { useAuthContext } from "../../auth/AuthContext";
import { type User } from "../../interface/user.interface";

const EditProfile = () => {
  const auth = useAuthContext();
  const username = auth?.username;
  const authorization = auth?.authorization;
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleChangePassword = () => {
    HttpUtils.put<User>(`users/${username}`, { password }, { authorization });
  };
  const handleSubmit = () => {
    HttpUtils.put<User>(
      `users/${username}`,
      { email, password },
      { authorization }
    );
  };
  return (
    <div className="profile-container">
      <h1>Edit Profile</h1>
      <div className="edit-profile-form">
        <div className="username-display">@{username}</div>
        
        <div className="form-section">
          <h3>Change Password</h3>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Enter new password"
            />
          </div>
          <button onClick={handleChangePassword}>Update Password</button>
        </div>

        <div className="form-section">
          <h3>Update Profile Information</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.currentTarget.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Enter your email"
            />
          </div>
          <button onClick={handleSubmit}>Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
