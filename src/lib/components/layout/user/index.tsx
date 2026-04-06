import React from "react";
import SidebarLayout from "./section/sidebar";
import { Tooltip, Button } from "@material-tailwind/react";
import { MdHomeRepairService } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import useAuth from "../../../hooks/authUser";
import Notification from "../../../services/pushNotify";
interface Props {
  children: React.ReactNode;
}
const UserDashboardLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const {user} = useAuth()
  const [toggled, setToggled] = React.useState(false);
  
  return (
    <>
      <Notification/>
      <div className="flex bg-gray-100">
        <div className="lg:w-[250px] border-r-2 bg-white">
          <SidebarLayout toggled={toggled} setToggled={setToggled}/>
        </div>
        <div className="w-full lg:w-[calc(100%_-_256px)] min-h-screen flex">
          <div className="w-full  bg-gray-50 h-screen overflow-y-auto scroll-pro">
            <div className="h-[60px] relative z-10">
              <div className="fixed w-full lg:w-[calc(100%_-_256px)] top-0 right-0">
                
              <div className="bg-gray-50 px-3  lg:pl-9 lg:pr-9 py-[26px] flex items-center lg:justify-between">
                <div className="pr-6 lg:hidden">
                  <AiOutlineMenuUnfold className='text-3xl' onClick={() => setToggled(true)}/>
                </div>
                <div>
                  <p className="fw-600">Hello {user.name}</p>
                  <p className="fs-300 text-grya-400">
                    Today is {dayjs().format('dddd DD, MMMM YYYY')}
                  </p>
                </div>
                <div className="hidden lg:flex gap-x-5 items-center">
                  <div className="flex gap-x-6">
                    <Tooltip content="Services Category">
                      <Button className="m-0 p-0 shadow-none hover:shadow-none bg-transparent text-black" onClick={() => navigate('/request')}><MdHomeRepairService className="text-3xl"/></Button>
                    </Tooltip>
                    <Button className="bg-primary fs-400 fw-500 text-white shadow-md px-5 py-2 rounded" onClick={() => navigate('/user/services')}>
                      Request for Service
                    </Button>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="px-3 lg:px-9 mt-8 lg:mt-12">{children}</div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default UserDashboardLayout;
