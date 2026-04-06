import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { RouteType, Routes } from "./routes";
import { Link, useLocation } from "react-router-dom";
import useModal from "../../../../hooks/useModal";
import { BiLogOutCircle } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import LogoutModal from "../../../auth/AdminLogoutModal";
import { FC } from "react";

interface Props {
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}
const SidebarLayout: FC<Props> = ({ toggled, setToggled }) => {
  const path = useLocation();
  const { Modal, setShowModal } = useModal();

  return (
    <div className="left-0 top-0 fixed overflow-y-hidden rounded-r-3xl index-30  bg-primary text-white">
      <Sidebar
        customBreakPoint="1024px"
        className="h-screen overflow-y-hidden scroll-pro lg:pb-4 fs-700 fw-500 lg:px-4"
        backgroundColor="#111827"
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
      >
        <div className="flex justify-center py-6 lg:py-9 lg:pb-8 items-center">
          <Link to="/" className="flex justify-center gap-x-1">
            <img
              src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1706192917/rsh/Group_48097864_1_mopmlj.png"
              alt="logo"
              className="w-10/12"
            />
            {/* <p className="fw-700 text-[19px] uppercase">Roadside Heroes</p> */}
          </Link>
        </div>
        <Menu
          className="overflow-y-auto relative scroll-pro h-[84vh]"
          transitionDuration={600}
          menuItemStyles={{
            button: ({ level, active }) => {
              if (level === 0)
                return {
                  color: active ? "black" : "#b5b3b3",
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
            component={<Link to={"/admin/settings"} />}
            icon={<BsGear className="text-xl" />}
            className=""
          >
            <p className="fs-400">Settings</p>
          </MenuItem>
          <MenuItem
            icon={<BiLogOutCircle className="text-xl" />}
            onClick={() => setShowModal(true)}
            className=""
          >
            <p className="fs-400">Logout</p>
          </MenuItem>
        </Menu>
      </Sidebar>
      <Modal title="" size="xs">
        <LogoutModal CloseModal={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default SidebarLayout;
