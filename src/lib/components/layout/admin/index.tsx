import React from "react";
import SidebarLayout from "./section/sidebar";
import { RiArrowDropDownLine, RiMenu4Fill } from "react-icons/ri";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { BsGear } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import useModal from "../../../hooks/useModal";
import useAuth from "../../../hooks/authUser";
import ProfileAvatar from "../../ui/ProfileAvatar";
import NotifyDrop from "../../admin/home/NotifyDrop";
import LogoutModal from "../../auth/AdminLogoutModal";
import Notification from "../../../services/pushNotify";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
}
const AdminDashboardLayout: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { Modal, setShowModal } = useModal();
  const [toggled, setToggled] = React.useState(false);

  const displayLogOut = () => {
    setShowModal(true);
  };

  return (
    <>
      <Notification />
      <div className="flex bg-light">
        <div className="lg:w-[250px]">
          <SidebarLayout toggled={toggled} setToggled={setToggled} />
        </div>
        <div className="w-full lg:w-[calc(100%_-_256px)] min-h-screen bg-light py-4 lg:py-9">
          <div className="">
            <div className="h-[60px] relative z-10">
              <div className="fixed top-0 w-full lg:w-[calc(100%_-_250px)] px-2 lg:pl-9 lg:pr-5 py-4 lg:py-[26px] bg-light flex items-center justify-between">
                <RiMenu4Fill
                  className="lg:hidden text-4xl"
                  onClick={() => setToggled(true)}
                />
                <div className="flex">
                  <div
                    className="flex gap-x-2 items-center cursor-pointer"
                    onClick={() => navigate(-1)}
                  >
                    <div className="w-8 h-8 p-2 rounded-md bg-black text-white">
                      <FaLongArrowAltLeft />
                    </div>
                    <p className="fw-600 lg:text-lg">Admin Dashboard</p>
                  </div>
                </div>
                <div className="flex gap-x-5 items-center">
                  <NotifyDrop />
                  <div className="flex gap-x-4 items-center">
                    <ProfileAvatar
                      url={user.image}
                      name={user.name}
                      size={44}
                      font={17}
                    />
                    <div className="hidden lg:flex gap-x-4 items-center cursor-pointer">
                      <p className="fw-500">{user.name}</p>
                      <Menu placement="bottom-start">
                        <MenuHandler>
                          <Button className="p-0 m-0 bg-transparent !shadow-none">
                            <RiArrowDropDownLine className="cursor-pointer text-black text-3xl" />
                          </Button>
                        </MenuHandler>
                        <MenuList className="index-30 text-black w-44">
                          <MenuItem
                            className="flex gap-x-2 items-center fw-500"
                            onClick={() => navigate("/admin/settings")}
                          >
                            <BsGear className="text-2xl" />
                            Settings
                          </MenuItem>
                          <MenuItem
                            className="flex gap-x-2 items-center fw-500"
                            onClick={() => displayLogOut()}
                          >
                            <IoLogOutOutline className="text-2xl" />
                            Logout
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 lg:px-9">{children}</div>
          </div>
        </div>
      </div>
      <Modal title="" size="xs">
        <LogoutModal CloseModal={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default AdminDashboardLayout;
