// import AuthLayout from "../../lib/components/layout/auth";
import { authRoutes } from "./routes";
import { Route, Routes } from "react-router-dom";

const AuthRouting = () => {
  return (
    <Routes>
      {authRoutes.map((item) => {
        return (
          <Route path={item.path} element={item.component} key={item.id} />
        );
      })}
    </Routes>
  );
};

export default AuthRouting;
