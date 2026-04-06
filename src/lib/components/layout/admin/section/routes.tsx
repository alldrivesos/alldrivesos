import { MdOutlineDashboard, MdOutlineRateReview } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import {
  RiCarWashingFill,
  RiRefund2Line,
  RiSecurePaymentFill,
  RiUserSettingsLine,
} from "react-icons/ri";
import { BiCar, BiCategoryAlt, BiGitPullRequest } from "react-icons/bi";
import { LuServerCog } from "react-icons/lu";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import { FaBloggerB } from "react-icons/fa6";
import { FaMotorcycle } from "react-icons/fa";

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
    route: "/admin",
    submenu: [],
  },
  {
    name: "Users",
    icon: <HiOutlineUsers className="text-xl" />,
    route: "/admin/users",
    submenu: [],
  },
  {
    name: "Providers",
    icon: <RiUserSettingsLine className="text-xl" />,
    route: "/admin/providers",
    submenu: [],
  },
  {
    name: "Service List",
    icon: <BiCategoryAlt className="text-xl" />,
    route: "/admin/category",
    submenu: [],
  },
  {
    name: "Service Requests",
    icon: <BiGitPullRequest className="text-xl" />,
    route: "/admin/requests",
    submenu: [],
  },
  {
    name: "Fulfilled Services",
    icon: <RiCarWashingFill className="text-xl" />,
    route: "/admin/fulfilled-services",
    submenu: [],
  },
  {
    name: "Completed Services",
    icon: <LuServerCog className="text-xl" />,
    route: "/admin/services",
    submenu: [],
  },
  {
    name: "Refund Request",
    icon: <RiRefund2Line className="text-xl" />,
    route: "/admin/refund-request",
    submenu: [],
  },
  {
    name: "Service Reviews",
    icon: <MdOutlineRateReview className="text-xl" />,
    route: "/admin/reviews",
    submenu: [],
  },
  {
    name: "Car Makes",
    icon: <BiCar className="text-xl" />,
    route: "/admin/car-makes",
    submenu: [],
  },
  {
    name: "Motorcycle Makes",
    icon: <FaMotorcycle className="text-xl" />,
    route: "/admin/motorcycle-makes",
    submenu: [],
  },
  {
    name: "Blog",
    icon: <FaBloggerB className="text-xl" />,
    route: "/admin/blog",
    submenu: [
      {
        name: "Blog",
        icon: <FaBloggerB className="text-xl" />,
        route: "/admin/blog",
        submenu: [],
      },
      {
        name: "Blog Category",
        icon: <FaBloggerB className="text-xl" />,
        route: "/admin/blog-category",
        submenu: [],
      },
    ],
  },
  {
    name: "Notifications",
    icon: <IoNotificationsCircleOutline className="text-xl" />,
    route: "/admin/notify",
    submenu: [],
  },
  {
    name: "Company Payouts",
    icon: <RiSecurePaymentFill className="text-xl" />,
    route: "/admin/payouts",
    submenu: [],
  },
  {
    name: "Technicians Payout",
    icon: <RiSecurePaymentFill className="text-xl" />,
    route: "/admin/technicians-payouts",
    submenu: [],
  },
  {
    name: "Payments",
    icon: <BsCashCoin className="text-xl" />,
    route: "/admin/payments",
    submenu: [],
  },
];
