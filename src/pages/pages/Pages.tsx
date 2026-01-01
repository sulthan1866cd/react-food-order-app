import { Link } from "react-router-dom";

const Pages = () => {
  return (
    <div>
      <div>
        <Link to="/admin-register">admin-register</Link>
      </div>
      <div>
        <Link to="/edit-menu">edit-menu</Link>
      </div>
      <div>
        <Link to="/all-orders">all-orders</Link>
      </div>
      <div>
        <Link to="/menu">menu</Link>
      </div>
      <div>
        <Link to="/register">register</Link>
      </div>
    </div>
  );
};

export default Pages;
