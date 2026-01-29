import { Link } from "react-router-dom";
import { useAuthContext } from "../../auth/AuthContext";
import "./pages.scss";
import { Role } from "../../enum/role.enum";

const Pages = () => {
  const { username, role } = useAuthContext()!;

  return (
    <div className="pages-container">
      <h1>Navigation</h1>
      {role === Role.ADMIN && (
        <>
          <h1>Admin paths</h1>
          <div className="pages-grid">
            <Link to="/admin-register">
              <div className="page-link-card">Admin Register</div>
            </Link>
          </div>
        </>
      )}
      {(role === Role.CHEF || role === Role.ADMIN) && (
        <>
          <h1>Chef Paths</h1>
          <div className="pages-grid">
            <Link to="/edit-menu">
              <div className="page-link-card">Edit Menu</div>
            </Link>
            <Link to="/all-orders">
              <div className="page-link-card">All Orders</div>
            </Link>
          </div>
          <h1>Customer Paths</h1>
        </>
      )}
      <div className="pages-grid">
        <Link to="/register">
          <div className="page-link-card">Register</div>
        </Link>
        <Link to="/menu">
          <div className="page-link-card">Menu</div>
        </Link>
        <Link to="/my-orders">
          <div className="page-link-card">My Orders</div>
        </Link>
        <Link to={`/${username}`}>
          <div className="page-link-card">Profile</div>
        </Link>
        <Link to={`/${username}/edit`}>
          <div className="page-link-card">Edit Profile</div>
        </Link>
        <Link to={`/`}>
          <div className="page-link-card">login</div>
        </Link>
      </div>
    </div>
  );
};

export default Pages;
