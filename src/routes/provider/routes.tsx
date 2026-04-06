import ServiceAlerts from "../../pages/provider/alerts";
import CompletedServices from "../../pages/provider/completed-services";
import ProviderHomePage from "../../pages/provider/home";
import CompanyInvites from "../../pages/provider/invite";
import ProviderNotification from "../../pages/provider/notify";
import ProviderPayments from "../../pages/provider/payments";
import StaffPayouts from "../../pages/provider/payouts";
import ComapanyRefunds from "../../pages/provider/refund";
import RequestDetail from "../../pages/provider/requestDetail";
import ProviderServices from "../../pages/provider/services";
import ProviderSetting from "../../pages/provider/settings";
import CompanyStaffs from "../../pages/provider/staff";
import StaffDetail from "../../pages/provider/staffDetail";
import UserWallet from "../../pages/user/wallet";

export const providerRoutes = [
  {
    id: "user1",
    path: "",
    component: <ProviderHomePage />,
  },
  {
    id: "user2",
    path: "services",
    component: <ProviderServices />,
  },
  {
    id: "user0",
    path: "services/:id",
    component: <RequestDetail />,
  },
  {
    id: "user2",
    path: "services-alerts",
    component: <ServiceAlerts />,
  },
  {
    id: "user3",
    path: "notify",
    component: <ProviderNotification />,
  },
  {
    id: "user4",
    path: "payments",
    component: <ProviderPayments />,
  },
  {
    id: "user5",
    path: "settings",
    component: <ProviderSetting />,
  },
  {
    id: "user6",
    path: "staff",
    component: <CompanyStaffs />,
  },
  {
    id: "users-7",
    path: "staff/:id",
    component: <StaffDetail />,
  },
  {
    id: "users-8",
    path: "invite",
    component: <CompanyInvites />,
  },
  {
    id: "users-9",
    path: "payouts",
    component: <StaffPayouts />,
  },
  {
    id: "users-10",
    path: "completed-services",
    component: <CompletedServices />,
  },
  {
    id: "users-11",
    path: "refunds",
    component: <ComapanyRefunds />,
  },
  {
    id: "user-12",
    path: "wallet",
    component: <UserWallet />,
  },
];
