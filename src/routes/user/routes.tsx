import GeneralNotificationPage from "../../lib/components/shared/NotificationPage";
import CompleteQuotes from "../../pages/user/CompleteQuotes";
import CompleteRequests from "../../pages/user/CompleteRequest";
import UsersHome from "../../pages/user/home";
import NewRequests from "../../pages/user/new-request";
import UserNotification from "../../pages/user/notify";
import UserPayments from "../../pages/user/payment";
import UserRequests from "../../pages/user/requests";
import ServiceDetails from "../../pages/user/serviceDetails";
import UserServices from "../../pages/user/services";
import UserSettings from "../../pages/user/settings";
import UserRefunds from "../../pages/user/user-refunds";
import UserWallet from "../../pages/user/wallet";

export const userRoutes = [
  {
    id: "user1",
    path: "",
    component: <UsersHome />,
  },
  {
    id: "user2",
    path: "requests",
    component: <UserRequests />,
  },
  {
    id: "user8",
    path: "requests/:id",
    component: <ServiceDetails />,
  },
  {
    id: "refund-request",
    path: "refund-request",
    component: <UserRefunds />,
  },
  {
    id: "user3",
    path: "services",
    component: <UserServices />,
  },
  {
    id: "user4",
    path: "notify",
    component: <UserNotification />,
  },
  {
    id: "user4",
    path: "notify/:id",
    component: <GeneralNotificationPage />,
  },
  {
    id: "user8",
    path: "Payments",
    component: <UserPayments />,
  },
  {
    id: "user5",
    path: "settings",
    component: <UserSettings />,
  },
  {
    id: "user12",
    path: "wallet",
    component: <UserWallet />,
  },
  {
    id: "user13",
    path: "new-request/:id",
    component: <NewRequests />,
  },
  {
    id: "user14",
    path: "new-request/complete/:name/quotes/:id",
    component: <CompleteQuotes />,
  },
  {
    id: "user14",
    path: "new-request/complete/:id",
    component: <CompleteRequests />,
  },
];
