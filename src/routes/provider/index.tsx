import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { providerRoutes } from "./routes";
import ProviderDashboardLayout from "../../lib/components/layout/provider";

const ProviderDashboardWraper = () => {
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
      <ProviderDashboardLayout>
        <Routes>
          {providerRoutes.map((item) => {
            return (
              <Route path={item.path} element={item.component} key={item.id} />
            );
          })}
        </Routes>
      </ProviderDashboardLayout>
    </>
  );
};

export default ProviderDashboardWraper;
