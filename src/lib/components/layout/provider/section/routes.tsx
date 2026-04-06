import {
  MdInsertInvitation,
  MdOutlineCrisisAlert,
  MdOutlineDashboard,
  MdOutlineHomeRepairService,
} from "react-icons/md";
import { BiGitPullRequest } from "react-icons/bi";
import { LuServerCog } from "react-icons/lu";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { RiSecurePaymentFill } from "react-icons/ri";
import { PiListChecksFill } from "react-icons/pi";
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
    route: "/provider",
    submenu: [],
  },
  {
    name: "Invites",
    icon: <MdInsertInvitation className="text-xl" />,
    route: "/provider/invite",
    submenu: [],
  },
  {
    name: "Staff",
    icon: <MdOutlineHomeRepairService className="text-xl" />,
    route: "/provider/staff",
    submenu: [],
  },
  {
    name: "Services",
    icon: <BiGitPullRequest className="text-xl" />,
    route: "/provider/services",
    submenu: [],
  },
  {
    name: "Completed Services",
    icon: <PiListChecksFill className="text-xl" />,
    route: "/provider/completed-services",
    submenu: [],
  },
  {
    name: "Services Alerts",
    icon: <MdOutlineCrisisAlert className="text-xl" />,
    route: "/provider/services-alerts",
    submenu: [],
  },
  {
    name: "Notifications",
    icon: <IoNotificationsCircleOutline className="text-xl" />,
    route: "/provider/notify",
    submenu: [],
  },
  {
    name: "Payouts",
    icon: <RiSecurePaymentFill className="text-xl" />,
    route: "/provider/payouts",
    submenu: [],
  },
  {
    name: "Payments",
    icon: <LuServerCog className="text-xl" />,
    route: "/provider/payments",
    submenu: [],
  },
  {
    name: "Refunds",
    icon: <LuServerCog className="text-xl" />,
    route: "/provider/refunds",
    submenu: [],
  },
];
