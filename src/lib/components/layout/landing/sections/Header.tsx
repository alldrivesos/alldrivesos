import { FC, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import CallOutMenu from "./CallOut";
import { AiOutlineClose } from "react-icons/ai";
import { NAV_LIST } from "./Routes";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../../hooks/authUser";

interface Props {
  fixed?: boolean;
}
const Header: FC<Props> = ({ fixed }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();
  const { isLoggedIn, userType } = useAuth();
  const formatUserRoute = {
    professional: "/provider",
    private_client: "/user",
    admin: "/admin",
  };
  return (
    <>
      <div
        className={`w-full lg:p-4 py-3 ${
          fixed ? "absolute w-full top-0 left-0" : ""
        }`}
      >
        <div className="box">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1706192916/rsh/Group_48097863_txmkbr.png"
                alt="logo"
                width={100}
                height={60}
                className="lg:w-[190px] w-36"
              />
            </Link>
            <div className="lg:w-9/12 xl:w-8/12 2xl:w-7/12 lg:flex hidden justify-between">
              <ul className="flex gap-x-12 items-center justify-between">
                {NAV_LIST.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.url}
                      className={`${
                        pathname === item.url
                          ? "text-black fw-600"
                          : "text-ter fw-500"
                      } whitespace-nowrap`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="flex mx-7">
                {isLoggedIn ? (
                  <li>
                    <Link
                      to={
                        formatUserRoute[
                          userType as keyof typeof formatUserRoute
                        ]
                      }
                      className="btn-feel px-5 py-2 whitespace-nowrap"
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/auth/login"
                      className="btn-feel px-5 py-2 whitespace-nowrap"
                    >
                      Sign in
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="lg:hidden mb-2">
              {!showMenu ? (
                <HiMenuAlt3
                  className="text-4xl text-primary"
                  onClick={() => setShowMenu(true)}
                />
              ) : (
                <AiOutlineClose className="text-4xl text-white" />
              )}
            </div>
          </div>
        </div>
      </div>
      {showMenu && <CallOutMenu show={() => setShowMenu(!showMenu)} />}
    </>
  );
};

export default Header;
