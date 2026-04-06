import { MdOutlineDashboard } from "react-icons/md";
import { BiGitPullRequest } from "react-icons/bi";
import { LuServerCog } from "react-icons/lu";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { BsGear } from "react-icons/bs";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
export interface RouteType {
  name: string;
  icon: any;
  route: string;
  submenu: {
    name: string;
    icon: any;
    route: string;
  }[];
}
export const Routes = [
  {
    name: "Dashboard",
    icon: <MdOutlineDashboard className="text-xl" />,
    route: "/user",
    submenu: [],
  },
  {
    name: "My Requests",
    icon: <BiGitPullRequest className="text-xl" />,
    route: "/user/requests",
    submenu: [],
  },
  {
    name: "Services",
    icon: <LuServerCog className="text-xl" />,
    route: "/user/services",
    submenu: [],
  },
  // {
  //   name: "Wallet",
  //   icon: <LuServerCog className="text-xl" />,
  //   route: "/user/wallet",
  //   submenu: [],
  // },

  {
    name: "Notifications",
    icon: <IoNotificationsCircleOutline className="text-xl" />,
    route: "/user/notify",
    submenu: [],
  },
  {
    name: "Payments",
    icon: <LiaFileInvoiceDollarSolid className="text-xl" />,
    route: "/user/payments",
    submenu: [],
  },
  {
    name: "Refunds",
    icon: <LiaFileInvoiceDollarSolid className="text-xl" />,
    route: "/user/refund-request",
    submenu: [],
  },
  {
    name: "Settings",
    icon: <BsGear className="text-xl" />,
    route: "/user/settings",
    submenu: [],
  },
];
