import { landingRoutes } from "./routes";
import { Route} from "react-router-dom";

const LandingRouting = () => {
  return (
    <>
      {/* <LandingLayout> */}
          {landingRoutes.map((item) => {
            return <Route path={item.path} element={item.component} key={item.id} />;
          })}
      {/* </LandingLayout> */}
    </>
  );
};

export default LandingRouting;
