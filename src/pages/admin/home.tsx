import { BiFilter } from "react-icons/bi";
import { BsBarChartLine } from "react-icons/bs";
import { formatNumber } from "../../lib/utils";
import RecentRequests from "../../lib/components/admin/home/RecentRequests";
import { useQuery } from "@tanstack/react-query";
import { getAdminStat } from "../../lib/services/api/adminApi";
import Alerts from "../../lib/components/provider/home/Alerts";
import { Link } from "react-router-dom";
// import ColumnChart from "../../lib/components/admin/home/ActivityChart";

const AdminDashboardHome = () => {
  const { data: stat } = useQuery({
    queryKey: ["get-adminr-stat"],
    queryFn: getAdminStat,
  });
  const serviceData = [
    {
      name: "Services Rendered",
      rate: "+15%",
      value: stat?.data?.totalRendered || "0",
      path: "/admin/services",
    },
    {
      name: "Total Services",
      rate: "+115%",
      value: stat?.data?.totalServices || "0",
      path: "/admin/requests",
    },
    {
      name: "Total Users",
      rate: "+55%",
      value: stat?.data?.totalUsers || "0",
      path: "/admin/users",
    },
    {
      name: "Total Providers",
      rate: "+55%",
      value: stat?.data?.totalProviders || "0",
      path: "/admin/providers",
    },
  ];
  return (
    <>
      <div className="lg:flex gap-x-10">
        <div className="lg:w-[70%]">
          <div className="rounded-xl bg-review text-white p-5">
            <p>Total services amount</p>
            <p className="text-4xl fw-700 my-3">
              {stat?.data?.serviceAmount || "$0"}
            </p>
            <p>
              {stat?.data?.totalProviders || 0} services providers has rendered{" "}
              {stat?.data?.totalRendered || 0} services
            </p>
          </div>
          <div>
            <div className="grid lg:grid-cols-2 gap-y-3 gap-x-4 mt-5 lg:mt-7">
              {serviceData &&
                !!serviceData.length &&
                serviceData.map((item, index) => (
                  <Link
                    to={item.path}
                    className="p-[22px] xl:grow cursor-default rounded-[10px] bg-white shadow hover:scale-x-105 duration-100"
                    key={index}
                  >
                    <div className="flex items-center justify-between">
                      <p className="uppercase fs-400 text-[#848484]">
                        {item.name}
                      </p>
                      <BiFilter className="text-[#848484] text-xl" />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="fw-900 text-xl">
                        {formatNumber(item.value)}
                      </p>
                      <div className="relative">
                        <BsBarChartLine className="text-[#0DA54E] absolute right-1" />
                        {/* <p className="fs-300 text-[#0DA54E] fw-600 mt-4">
                          {item.rate}
                        </p> */}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          <div className="mt-6">
            <Alerts data={stat?.data?.alerts || []} />
          </div>
        </div>
        <div className="lg:w-[30%] mt-6 lg:mt-0">
          <RecentRequests request={stat?.data?.pendingRequests || []} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardHome;
