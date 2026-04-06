import { Route, Routes, useNavigate } from "react-router-dom";
import UserDashboardLayout from "../../lib/components/layout/user";
import { userRoutes } from "./routes";
import { useEffect } from "react";

const UsersDashboardWraper = () => {
  const token = localStorage.getItem('rhs_token');
  const navigate = useNavigate();
  useEffect(() => {
    if(!token){
      navigate("/auth/login");
    }
  }, [])
  if (!token) {
    return;
  }
  return (
    <>
      <UserDashboardLayout>
        <Routes>
          {userRoutes.map((item) => {
            return (
              <Route path={item.path} element={item.component} key={item.id} />
            );
          })}
        </Routes>
      </UserDashboardLayout>
    </>
  );
};

export default UsersDashboardWraper;
