import BlogPage from "../../pages/admin/blog";
import BlogCategory from "../../pages/admin/blog-category";
import CarMakes from "../../pages/admin/car-makes";
import AdminCategory from "../../pages/admin/category";
import EditBlog from "../../pages/admin/edit-blog";
import AdminFulfilledServices from "../../pages/admin/fulfilledService";
import AdminDashboardHome from "../../pages/admin/home";
import MotocycleMakes from "../../pages/admin/motocycle-makes";
import AdminNotification from "../../pages/admin/notify";
import AdminPayments from "../../pages/admin/payment";
import CompanyPayouts from "../../pages/admin/payouts";
import ProviderDetails from "../../pages/admin/providerDetails";
import ServiceProviders from "../../pages/admin/providers";
import RefundRequests from "../../pages/admin/refund";
import AdminRequests from "../../pages/admin/requests";
import AllReviews from "../../pages/admin/reviews";
import AdminServiceDetails from "../../pages/admin/serviceDetails";
import AdminRenderedServices from "../../pages/admin/services";
import AdminSettings from "../../pages/admin/settings";
import StaffDetail from "../../pages/admin/staffDetail";
import TechniciansPayout from "../../pages/admin/technicians-payout";
import AdminUserDetails from "../../pages/admin/userDetails";
import AdminUsers from "../../pages/admin/users";

export const adminRoutes = [
  {
    id: "admin1",
    path: "",
    component: <AdminDashboardHome />,
  },
  {
    id: "admin2",
    path: "users",
    component: <AdminUsers />,
  },
  {
    id: "admin2",
    path: "users/:id",
    component: <AdminUserDetails />,
  },
  {
    id: "admin3",
    path: "providers",
    component: <ServiceProviders />,
  },
  {
    id: "admin4",
    path: "category",
    component: <AdminCategory />,
  },
  {
    id: "admin5",
    path: "requests",
    component: <AdminRequests />,
  },
  {
    id: "admin14",
    path: "fulfilled-services",
    component: <AdminFulfilledServices />,
  },
  {
    id: "admin6",
    path: "services",
    component: <AdminRenderedServices />,
  },
  {
    id: "admin13",
    path: "services/:id",
    component: <AdminServiceDetails />,
  },
  {
    id: "admin7",
    path: "notify",
    component: <AdminNotification />,
  },
  {
    id: "admin8",
    path: "settings",
    component: <AdminSettings />,
  },
  {
    id: "admin9",
    path: "providers/:id",
    component: <ProviderDetails />,
  },
  {
    id: "admin10",
    path: "providers/staff/:id",
    component: <StaffDetail />,
  },
  {
    id: "admin11",
    path: "reviews",
    component: <AllReviews />,
  },
  {
    id: "admin12",
    path: "payments",
    component: <AdminPayments />,
  },
  {
    id: "admin15",
    path: "payouts",
    component: <CompanyPayouts />,
  },
  {
    id: "admin100",
    path: "technicians-payouts",
    component: <TechniciansPayout />,
  },
  {
    id: "refund-request",
    path: "refund-request",
    component: <RefundRequests />,
  },
  {
    id: "admin-19",
    path: "blog",
    component: <BlogPage />,
  },
  {
    id: "admin-20",
    path: "blog-category",
    component: <BlogCategory />,
  },
  {
    id: "admin-21",
    path: "blog/:id",
    component: <EditBlog />,
  },
  {
    id: "admin-22",
    path: "car-makes",
    component: <CarMakes />,
  },
  {
    id: "admin-23",
    path: "motorcycle-makes",
    component: <MotocycleMakes />,
  },
];
