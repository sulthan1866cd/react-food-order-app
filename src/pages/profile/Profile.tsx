import { useEffect, useState } from "react";
import type { User } from "../../interface/user.interface";
import { HttpUtils } from "../../utils/http.utils";
import { useAuthContext } from "../../auth/AuthContext";
import { Role } from "../../enum/role.enum";
import { useNavigate, useParams } from "react-router-dom";
import "./profile.scss";

const Profile = ({ role }: { role: Role }) => {
  const auth = useAuthContext();
  const { username } = useParams<{ username: string }>();
  const authUsername = auth?.username;
  const authorization = auth?.authorization;
  const navigate = useNavigate();
  const [user, SetUser] = useState<User>({
    email: "",
    fullName: "",
    id: "",
    password: "",
    role: "",
    username: "",
  });
  useEffect(() => {
    if (authUsername !== username) navigate("/");
  }, [authUsername, username, navigate]);

  useEffect(() => {
    HttpUtils.get<User>(
      role === Role.CUSTOMER
        ? `users/${authUsername}`
        : `admin/users/${authUsername}`,
      { authorization, setter: SetUser }
    );
  }, [role, authUsername, authorization]);
  return (
    <>
      <h1>{user.role} Details</h1>
      <div className="profile-card">
        {Object.keys(user || {}).map((key) => (
          <div key={key}>
            <span>{key + " : " + user[key as keyof User]}</span>
          </div>
        ))}
      </div>
    </>
  );
};
export default Profile;
