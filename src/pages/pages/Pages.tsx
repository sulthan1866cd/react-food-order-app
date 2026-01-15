import { Link } from "react-router-dom";
import { useAuthContext } from "../../auth/AuthContext";
import "./pages.scss";
import { Role } from "../../enum/role.enum";

const Pages = () => {
  const auth = useAuthContext();
  const username = auth?.username;
  const role = auth?.role;

  return (
    <div className="pages-container">
      <h1>Navigation</h1>
      {role === Role.ADMIN && (
        <>
          <h1>Admin paths</h1>
          <div className="pages-grid">
            <div className="page-link-card">
              <Link to="/admin-register">Admin Register</Link>
            </div>
          </div>
        </>
      )}
      {(role === Role.CHEF || role === Role.ADMIN) && (
        <>
          <h1>Chef Paths</h1>
          <div className="pages-grid">
            <div className="page-link-card">
              <Link to="/edit-menu">Edit Menu</Link>
            </div>
            <div className="page-link-card">
              <Link to="/all-orders">All Orders</Link>
            </div>
          </div>
          <h1>Customer Paths</h1>
        </>
      )}
      <div className="pages-grid">
        <div className="page-link-card">
          <Link to="/register">Register</Link>
        </div>
        <div className="page-link-card">
          <Link to="/menu">Menu</Link>
        </div>
        <div className="page-link-card">
          <Link to="/my-orders">My Orders</Link>
        </div>
        <div className="page-link-card">
          <Link to={`/${username}`}>Profile</Link>
        </div>
        <div className="page-link-card">
          <Link to={`/${username}/edit`}>Edit Profile</Link>
        </div>
        <div className="page-link-card">
          <Link to={`/`}>login</Link>
        </div>
      </div>
    </div>
  );
};

export default Pages;
