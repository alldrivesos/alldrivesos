import AdminDashboardLayout from "../../lib/components/layout/admin";
import { Route, Routes, useNavigate } from "react-router-dom";
import { adminRoutes } from "../../routes/admin/routes";
import { useEffect } from "react";

const AdminDashboard = () => {
  const token = localStorage.getItem('rhs_token');
  const navigate = useNavigate();
  useEffect(() => {
    if(!token){
      navigate("/auth/admin");
    }
  }, [])
  if (!token) {
    return;
  }
  return (
    <>
      <AdminDashboardLayout>
        <Routes>
          {adminRoutes.map((item) => {
            return (
              <Route path={item.path} element={item.component} key={item.id} />
            );
          })}
        </Routes>
      </AdminDashboardLayout>
    </>
  );
};

export default AdminDashboard;
