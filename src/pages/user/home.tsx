import { useQuery } from "@tanstack/react-query";
import Alerts from "../../lib/components/user/home/Alerts";
import UserStats from "../../lib/components/user/home/Stats";
import { getClientStats } from "../../lib/services/api/clientApi";

const UsersHome = () => {
  const { data } = useQuery({
    queryKey: ["get-client-stats"],
    queryFn: getClientStats,
  });
  const payTotal = data?.data?.paymentTotal || 0;
  const completedRequests = data?.data?.totalCompletedRequests || 0;
  const totalRequests = data?.data?.totalServiceRequests || 0;
  const recentNotifications = data?.data?.recentNotifications || [];

  return (
    <>
      <div>
        <div className="mb-6">
          <UserStats
            payTotal={payTotal}
            completed={completedRequests}
            total={totalRequests}
          />
        </div>
        <div>
          <div>
            <Alerts recentNotify={recentNotifications} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersHome;
