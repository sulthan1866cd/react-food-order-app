import { ToastContainer } from "react-toastify";
import "./App.css";
import Menu from "./pages/menu/Menu";
import AuthProvider from "./auth/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/forms/Login";
import AuthGuard from "./auth/AuthGuard";
import MyOrders from "./pages/myOrders/MyOrders";
import Register from "./pages/forms/Register";
import EditMenu from "./pages/editMenu/EditMenu";
import { Role } from "./enum/role.enum";
import AllOrders from "./pages/allOrders/AllOrders";
import Pages from "./pages/pages/Pages";

function App() {

  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin-register"
              element={
                <AuthGuard requiredRoles={[Role.ADMIN]}>
                  <Register isAdmin />
                </AuthGuard>
              }
            />
            <Route
              path="/menu"
              element={
                <AuthGuard>
                  <Menu />
                </AuthGuard>
              }
            />
            <Route
              path="/my-orders"
              element={
                <AuthGuard>
                  <MyOrders />
                </AuthGuard>
              }
            />
            <Route
              path="/pages"
              element={
                <AuthGuard requiredRoles={[Role.CHEF, Role.ADMIN]}>
                  <Pages />
                </AuthGuard>
              }
            />
            <Route
              path="/edit-menu"
              element={
                <AuthGuard requiredRoles={[Role.CHEF]}>
                  <EditMenu />
                </AuthGuard>
              }
            />
            <Route
              path="/all-orders"
              element={
                <AuthGuard requiredRoles={[Role.CHEF]}>
                  <AllOrders />
                </AuthGuard>
              }
            />
            {/* <Route
              path="/:username"
              element={
                <div>
                  {(() => {
                    return JSON.stringify({
                      username: auth?.username,
                      auth: auth?.authorization,
                    });
                  })()}
                </div>
              }
            /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
