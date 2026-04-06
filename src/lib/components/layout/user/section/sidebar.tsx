import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { RouteType, Routes } from "./routes";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../../hooks/authUser";
import ProfileAvatar from "../../../ui/ProfileAvatar";
import useDialog from "../../../../hooks/useDialog";
import LogoutModal from "../../../auth/LogoutModal";
import { BiLogOutCircle } from "react-icons/bi";
import { FC } from "react";

interface Props {
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}
const SidebarLayout: FC<Props> = ({ toggled, setToggled }) => {
  const path = useLocation();
  const { user, firstName, lastName } = useAuth();
  const { Dialog, setShowModal } = useDialog();

  return (
    <div className="left-0 top-0 fixed overflow-y-hidden rounded-r-3xl index-10">
      <Sidebar
        customBreakPoint="1024px"
        className="h-screen overflow-y-hidden scroll-pro lg:pb-4 fs-700 fw-500 lg:px-4"
        backgroundColor="white"
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
      >
        <div className="py-6 text-center lg:pb-8">
          <Link to="/" className="flex justify-center gap-x-1">
            <img
              src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1706192916/rsh/Group_48097863_txmkbr.png"
              alt="logo"
              className="w-10/12"
            />
          </Link>
          <div className="mt-10 flex justify-center">
            <ProfileAvatar
              url={user.image}
              name={`${firstName} ${lastName}`}
              size={150}
              font={30}
            />
          </div>
        </div>
        <Menu
          className="overflow-y-auto scroll-pro "
          transitionDuration={600}
          menuItemStyles={{
            button: ({ level, active }) => {
              if (level === 0)
                return {
                  color: active ? "black" : "#343635",
                  marginTop: "4px",
                  height: "auto",
                  padding: "3px 15px 3px 0px !important ",
                  textAlign: "left",
                  fontWeight: active ? "600" : "500",
                  borderLeft: active ? "5px solid #090979" : "",
                  background: active ? "#e3f9ff" : "",
                  "&:hover": {
                    color: "black",
                    background: "#e3f9ff",
                    borderLeft: "5px solid #090979",
                    fontWeight: "500",
                  },
                };
            },
          }}
        >
          {Routes.map((item) => {
            return (
              <>
                {!!item.submenu.length ? (
                  <SubMenu label={item.name} icon={item.icon} key={item.name}>
                    {item.submenu.map((item: RouteType, i) => (
                      <MenuItem
                        component={<Link to={item.route} />}
                        active={path.pathname === item.route && true}
                        key={i}
                      >
                        <p className="fs-400">{item.name}</p>
                      </MenuItem>
                    ))}
                  </SubMenu>
                ) : (
                  <MenuItem
                    component={<Link to={item.route} />}
                    icon={item.icon}
                    active={path.pathname === item.route && true}
                    key={item.name}
                  >
                    <p className="fs-400">{item.name}</p>
                  </MenuItem>
                )}
              </>
            );
          })}
          <MenuItem
            icon={<BiLogOutCircle className="text-xl" />}
            onClick={() => setShowModal(true)}
            className=""
          >
            <p className="fs-400">Logout</p>
          </MenuItem>
        </Menu>
      </Sidebar>
      <Dialog title="" size="sm">
        <LogoutModal CloseModal={() => setShowModal(false)} />
      </Dialog>
    </div>
  );
};

export default SidebarLayout;
